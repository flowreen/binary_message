export type Message = {
    headers: Map<string, string>;
    payload: Uint8Array;
};

export interface MessageCodec {
    encode(message: Message): Uint8Array;
    decode(data: Uint8Array): Message;
}
