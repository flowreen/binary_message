export class Utils {
    /**
     * Converts a given ASCII string into a Uint8Array.
     *
     * @param str The ASCII string to be converted.
     * @returns The resulting Uint8Array.
     */
    public static stringToAsciiUint8Array(str: string): Uint8Array {
        if (!/^[\x00-\x7F]*$/.test(str)) {
            throw new Error("Input string contains non-ASCII characters.");
        }

        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }

    /**
     * Converts a given Uint8Array into an ASCII string.
     *
     * @param arr The Uint8Array to be converted.
     * @returns The resulting ASCII string.
     */
    public static asciiUint8ArrayToString(arr: Uint8Array): string {
        return Array.from(arr).map(byte => String.fromCharCode(byte)).join('');
    }

    /**
     * Converts a given number into a Uint8Array of specified bytes.
     *
     * @param num The number to be converted.
     * @param bytes The number of bytes for the resulting Uint8Array.
     * @returns The resulting Uint8Array.
     */
    public static numberToUint8Array(num: number, bytes: number): Uint8Array {
        const arr = new Uint8Array(bytes);
        for (let i = 0; i < bytes; i++) {
            arr[i] = (num >> (8 * (bytes - 1 - i))) & 0xFF;
        }
        return arr;
    }

    /**
     * Converts a given Uint8Array into a number.
     *
     * @param arr The Uint8Array to be converted.
     * @returns The resulting number.
     */
    public static uint8ArrayToNumber(arr: Uint8Array): number {
        return arr.reduce((acc, val, idx) => acc + (val << (8 * (arr.length - 1 - idx))), 0);
    }

    /**
     * Concatenates multiple Uint8Arrays into a single Uint8Array.
     *
     * @param arrays The Uint8Arrays to be concatenated.
     * @returns The resulting concatenated Uint8Array.
     */
    public static concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
        const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const array of arrays) {
            result.set(array, offset);
            offset += array.length;
        }
        return result;
    }
}
