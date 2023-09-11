import {BinaryMessageCodec} from "./Classes/BinaryMessageCodec";
import {Message} from "./Interfaces/MessageCodec";
import {Utils} from "./Classes/Utils";

const codec = new BinaryMessageCodec();

// Basic test case
const message: Message = {
    headers: new Map([["header1", "value1"], ["header2", "value2"]]),
    payload: Utils.stringToAsciiUint8Array("Hello, world!")
};
console.log("Basic Test Case:");
encodeDecodeAndLog(message);

// Test case with maximum headers
const maxHeaders = new Map();
for (let i = 0; i < 63; i++) {
    maxHeaders.set(`header${i}`, `value${i}`);
}
const maxHeadersMessage: Message = {
    headers: maxHeaders,
    payload: Utils.stringToAsciiUint8Array("Max headers test!")
};
console.log("\nMax Headers Test Case:");
encodeDecodeAndLog(maxHeadersMessage);

// Test case with maximum payload size
const maxPayload = new Uint8Array(256 * 1024).fill(65); // Filling with ASCII value of 'A'
const maxPayloadMessage: Message = {
    headers: new Map([["header", "value"]]),
    payload: maxPayload
};
console.log("\nMax Payload Test Case:");
encodeDecodeAndLog(maxPayloadMessage);

/**
 * Encodes and then decodes a message, logging the results.
 *
 * @param message The message to be encoded and decoded.
 */
function encodeDecodeAndLog(message: Message) {
    console.log("Before encoding:");
    console.log("Headers:", message.headers);
    console.log("Payload:", Utils.asciiUint8ArrayToString(message.payload));

    const encoded = codec.encode(message);
    console.log("\nEncoded message:", encoded);

    const decoded = codec.decode(encoded);
    console.log("\nDecoded message:");
    console.log("Headers:", decoded.headers);
    console.log("Payload:", Utils.asciiUint8ArrayToString(decoded.payload));
}
