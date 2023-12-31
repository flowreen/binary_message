import {Message, MessageCodec} from "../Interfaces/MessageCodec";
import {Utils} from "./Utils";

export class BinaryMessageCodec implements MessageCodec {
    /**
     * Encodes the given message into a Uint8Array.
     * The encoding scheme is as follows:
     * - First byte: Number of headers
     * - For each header:
     *   - 2 bytes: Length of the key
     *   - Key bytes
     *   - 2 bytes: Length of the value
     *   - Value bytes
     * - 3 bytes: Length of the payload
     * - Payload bytes
     *
     * @param message The message to be encoded.
     * @returns The encoded message as a Uint8Array.
     */
    encode(message: Message): Uint8Array {
        if (!message || !message.headers || !message.payload) {
            throw new Error("Invalid message format");
        }

        const headerCount = message.headers.size;
        if (headerCount > 63) {
            throw new Error("Too many headers");
        }

        const headerParts: Uint8Array[] = [];
        message.headers.forEach((value, key) => {
            const keyBytes = Utils.stringToAsciiUint8Array(key);
            const valueBytes = Utils.stringToAsciiUint8Array(value);
            if (keyBytes.length > 1023 || valueBytes.length > 1023) {
                throw new Error("Header key or value too long");
            }
            headerParts.push(Utils.numberToUint8Array(keyBytes.length, 2));
            headerParts.push(keyBytes);
            headerParts.push(Utils.numberToUint8Array(valueBytes.length, 2));
            headerParts.push(valueBytes);
        });

        const payloadLength = message.payload.length;
        if (payloadLength > 256 * 1024) {
            throw new Error("Payload too large");
        }

        const headerCountArray = new Uint8Array([headerCount]);
        const concatenatedArray = Utils.concatUint8Arrays(headerCountArray, ...headerParts.flat(), Utils.numberToUint8Array(payloadLength, 3), message.payload);
        return concatenatedArray;
    }

    /**
     * Decodes the given Uint8Array into a message.
     * The decoding process is the reverse of the encoding process.
     *
     * @param data The Uint8Array to be decoded.
     * @returns The decoded message.
     */
    decode(data: Uint8Array): Message {
        let offset = 0;

        const headerCount = data[offset++];
        const headers = new Map<string, string>();
        for (let i = 0; i < headerCount; i++) {
            const keyLength = Utils.uint8ArrayToNumber(data.slice(offset, offset + 2));
            offset += 2;
            const key = Utils.asciiUint8ArrayToString(data.slice(offset, offset + keyLength));
            offset += keyLength;

            const valueLength = Utils.uint8ArrayToNumber(data.slice(offset, offset + 2));
            offset += 2;
            const value = Utils.asciiUint8ArrayToString(data.slice(offset, offset + valueLength));
            offset += valueLength;

            headers.set(key, value);
        }

        const payloadLength = Utils.uint8ArrayToNumber(data.slice(offset, offset + 3));
        offset += 3;
        const payload = data.slice(offset, offset + payloadLength);

        return {
            headers,
            payload
        };
    }
}
