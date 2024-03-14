import type { JimpPlugins } from "../index.mjs";

function isEmptyArea(this: JimpPlugins, x: number, y: number, width: number, height: number) {
    let is_empty = true;

    const clone = this.clone().crop(x, y, width, height).autoCropTransparent();

    clone.scan(0, 0, clone.getWidth(), clone.getHeight(), function (x, y, idx) {
        if (!is_empty) {
            return;
        }

        if (this.bitmap.data[idx + 3] > 0) {
            is_empty = false;
        }
    });

    return is_empty;
}

export default () => ({
    isEmptyArea
});
