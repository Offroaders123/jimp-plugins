import Jimp from "jimp";

/**
 * @typedef {import("../index.mjs").default} JimpPlugins
*/

/**
 * @this {JimpPlugins}
 * @param {number} max_height
 * @returns {JimpPlugins}
 */
function ensureMaxHeight(max_height) {
    if (this.getHeight() > max_height) {
        scaleToHeight(this, max_height);
    }

    return this;
}

/**
 * @this {JimpPlugins}
 * @param {number} max_width
 * @returns {JimpPlugins}
 */
function ensureMaxWidth(max_width) {
    if (this.getWidth() > max_width) {
        scaleToWidth(this, max_width);
    }

    return this;
}

/**
 * @this {JimpPlugins}
 * @param {number} min_height
 * @returns {JimpPlugins}
 */
function ensureMinHeight(min_height) {
    if (this.getHeight() < min_height) {
        scaleToHeight(this, min_height);
    }

    return this;
}

/**
 * @this {JimpPlugins}
 * @param {number} min_width
 * @returns {JimpPlugins}
 */
function ensureMinWidth(min_width) {
    if (this.getWidth() < min_width) {
        scaleToWidth(this, min_width);
    }

    return this;
}

/**
 * @param {JimpPlugins} image
 * @param {number} height
 * @returns {void}
 */
function scaleToHeight(image, height) {
    scale(image, height, image.getHeight());
}

/**
 * @param {JimpPlugins} image
 * @param {number} width
 * @returns {void}
 */
function scaleToWidth(image, width) {
    scale(image, width, image.getWidth());
}

/**
 * @param {JimpPlugins} image
 * @param {number} new_size
 * @param {number} current_size
 * @returns {void}
 */
function scale(image, new_size, current_size) {
    image.scale((new_size / current_size), Jimp.RESIZE_NEAREST_NEIGHBOR);
}

export default () => ({
    ensureMaxHeight,
    ensureMaxWidth,
    ensureMinHeight,
    ensureMinWidth
});
