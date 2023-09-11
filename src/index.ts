import {SimpleMessageCodec} from "./Classes/BinaryMessageCodec";
import {Message} from "./Interfaces/MessageCodec";
import {Utils} from "./Classes/Utils";

const codec = new SimpleMessageCodec();
const message: Message = {
    headers: new Map([["header1", "value1"], ["header2", "value2"]]),
    payload: Utils.stringToAsciiUint8Array("Hello, world!")
};
console.log("Before encoding looks like this:");
console.log(message.headers);
console.log(Utils.asciiUint8ArrayToString(message.payload));
const encoded = codec.encode(message);
console.log("\nEncoded message looks like this:");
console.log(encoded);
const decoded = codec.decode(encoded);
console.log("\nDecoded message looks like this:");
console.log(decoded);
console.log("\nDecoded headers:");
console.log(decoded.headers);
console.log("\nDecoded payload:");
console.log(Utils.asciiUint8ArrayToString(decoded.payload));
