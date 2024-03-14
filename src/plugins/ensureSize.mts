import Jimp from "jimp";

import type { JimpPlugins } from "../index.mjs";

function ensureMaxHeight(this: JimpPlugins, max_height: number): JimpPlugins {
    if (this.getHeight() > max_height) {
        scaleToHeight(this, max_height);
    }

    return this;
}

function ensureMaxWidth(this: JimpPlugins, max_width: number): JimpPlugins {
    if (this.getWidth() > max_width) {
        scaleToWidth(this, max_width);
    }

    return this;
}

function ensureMinHeight(this: JimpPlugins, min_height: number): JimpPlugins {
    if (this.getHeight() < min_height) {
        scaleToHeight(this, min_height);
    }

    return this;
}

function ensureMinWidth(this: JimpPlugins, min_width: number): JimpPlugins {
    if (this.getWidth() < min_width) {
        scaleToWidth(this, min_width);
    }

    return this;
}

function scaleToHeight(image: JimpPlugins, height: number): void {
    scale(image, height, image.getHeight());
}

function scaleToWidth(image: JimpPlugins, width: number): void {
    scale(image, width, image.getWidth());
}

function scale(image: JimpPlugins, new_size: number, current_size: number): void {
    image.scale((new_size / current_size), Jimp.RESIZE_NEAREST_NEIGHBOR);
}

export default () => ({
    ensureMaxHeight,
    ensureMaxWidth,
    ensureMinHeight,
    ensureMinWidth
});
