/**
 * Represents a message with headers and a binary payload.
 *
 * - headers: A map of name-value pairs where both names and values are ASCII-encoded strings.
 * - payload: A binary representation of the message content.
 */
export type Message = {
    headers: Map<string, string>;
    payload: Uint8Array;
};

/**
 * Interface for encoding and decoding messages.
 */
export interface MessageCodec {
    /**
     * Encodes a given message into a Uint8Array.
     *
     * @param message The message to be encoded.
     * @returns The encoded message as a Uint8Array.
     */
    encode(message: Message): Uint8Array;

    /**
     * Decodes a given Uint8Array into a message.
     *
     * @param data The Uint8Array to be decoded.
     * @returns The decoded message.
     */
    decode(data: Uint8Array): Message;
}
