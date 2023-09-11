export class Utils {
    public static stringToAsciiUint8Array(str: string): Uint8Array {
        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }

    public static asciiUint8ArrayToString(arr: Uint8Array): string {
        return Array.from(arr).map(byte => String.fromCharCode(byte)).join('');
    }

    public static numberToUint8Array(num: number, bytes: number): Uint8Array {
        const arr = new Uint8Array(bytes);
        for (let i = 0; i < bytes; i++) {
            arr[i] = (num >> (8 * (bytes - 1 - i))) & 0xFF;
        }
        return arr;
    }

    public static uint8ArrayToNumber(arr: Uint8Array): number {
        return arr.reduce((acc, val, idx) => acc + (val << (8 * (arr.length - 1 - idx))), 0);
    }

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
