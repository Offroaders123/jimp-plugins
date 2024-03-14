import TGA from "tga";

import type Jimp from "jimp";

const FILE_EXTENSION = "tga";
const MIME_TYPE = "image/x-tga";

function encode(image: Jimp): Buffer {
    const buffer = TGA.createTgaBuffer(image.getWidth(), image.getHeight(), image.bitmap.data);

    return buffer;
}

export interface DecodedTGA {
    data: Uint8Array;
    height: number;
    width: number;
}

function decode(buffer: Buffer): DecodedTGA {
    const tga = new TGA(buffer);

    return {
        data: tga.pixels,
        height: tga.height,
        width: tga.width
    };
}

export default () => ({
    constants: {
        MIME_TGA: MIME_TYPE
    },

    encoders: {
        [MIME_TYPE]: encode
    },

    decoders: {
        [MIME_TYPE]: decode
    },

    mime: {
        [MIME_TYPE]: [FILE_EXTENSION]
    }
});
