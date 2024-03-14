import autoCropTransparent from "./plugins/autoCropTransparent.mjs";
import borderImage from "./plugins/borderImage.mjs";
import checkAreaIsSameColor from "./plugins/checkAreaIsSameColor.mjs";
import colorize from "./plugins/colorize.mjs";
import configure from "@jimp/custom";
import ensureSize from "./plugins/ensureSize.mjs";
import fillArea from "./plugins/fillArea.mjs";
import isEmptyArea from "./plugins/isEmptyArea.mjs";
import Jimp from "jimp";
import rotateSimple from "./plugins/rotateSimple.mjs";
import tga from "./types/tga.mjs";
import toRectangles from "./plugins/toRectangles.mjs";

configure({
    plugins: [
        autoCropTransparent,
        borderImage,
        checkAreaIsSameColor,
        colorize,
        ensureSize,
        fillArea,
        isEmptyArea,
        rotateSimple,
        toRectangles
    ],
    types: [
        tga
    ]
}, Jimp);

/**
 * @typedef {Jimp & ReturnType<typeof autoCropTransparent> & ReturnType<typeof borderImage> & ReturnType<typeof checkAreaIsSameColor> & ReturnType<typeof colorize> & ReturnType<typeof ensureSize> & ReturnType<typeof fillArea> & ReturnType<typeof isEmptyArea> & ReturnType<typeof rotateSimple> & ReturnType<typeof toRectangles>} JimpPlugins
*/

export default /** @type {JimpPlugins} */ (Jimp);
