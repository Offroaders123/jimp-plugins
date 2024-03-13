declare module "tga" {
  interface Header {
    bytesPerPixel: number;
    idlength: number;
    colourMapType: number;
    dataTypeCode: number;
    colourMapOrigin: number;
    colourMapLength: number;
    colourMapDepth: number;
    xOrigin: number;
    yOrigin: number;
    width: number;
    height: number;
    bitsPerPixel: number;
    imageDescriptor: number;
  }
  interface Options {
    isFlipY?: boolean;
  }
  class TGA {
    buffer: Buffer;
    isFlipY: boolean;
    header: Header;
    width: number;
    height: number;
    bytesPerPixel: number;
    pixels: Uint8Array;
    constructor(buffer: Buffer, opt?: Options);
    static createTgaBuffer(width: number, height: number, pixels: number[], dontFlipY?: boolean): Buffer;
    static getHeader(buffer: Buffer): Omit<Header, "bytesPerPixel"> & { bytesPerPixel?: number; };
    parse(): void;
    readHeader(): Header;
    check(): boolean;
    addPixel(arr: Uint8Array, offset: number, idx: number): void;
    readPixels(): void;
  }
  export = TGA;
}