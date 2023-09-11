# Binary Message Encoding Scheme
## Overview
This project provides a simple binary message encoding scheme tailored for real-time communication applications. It allows for efficient encoding and decoding of messages with a clear distinction between headers and payload.

## Message Structure
The binary message structure is designed as follows:

Header Count (1 byte): Indicates the number of headers present in the message.

Headers:

    For each header:
    Key Length (2 bytes): Specifies the length of the header key.
    Key (Variable length): ASCII-encoded header key.
    Value Length (2 bytes): Specifies the length of the header value.
    Value (Variable length): ASCII-encoded header value.

Payload Length (3 bytes): Indicates the size of the payload.

Payload (Variable length): The actual binary content of the message.

This compact structure ensures that messages can be encoded and decoded efficiently, with a minimal overhead.

# Constraints
A message can contain a variable number of headers, and a binary payload.

Header names and values are ASCII-encoded strings, each limited to 1023 bytes.

A message can have a maximum of 63 headers.

The message payload is limited to 256 KiB.

# Pre-requisites
Node.js (v14 or newer)

TypeScript (v4 or newer)

# Installation
Clone the repository:

    git clone https://github.com/flowreen/binary_message.git

Install the dependencies:

    npm install

Compile the TypeScript code:

    npm run start
