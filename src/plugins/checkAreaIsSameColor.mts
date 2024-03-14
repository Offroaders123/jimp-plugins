import type { JimpPlugins } from "../index.mjs";

function checkAreaIsSameColor(this: JimpPlugins, x: number, y: number, width: number, height: number, color: number[]): boolean {
    for (const {idx: idx2} of this.scanIterator(x, y, width, height)) {
        if (!(
            this.bitmap.data[idx2] === color[0]
            && this.bitmap.data[idx2 + 1] === color[1]
            && this.bitmap.data[idx2 + 2] === color[2]
            && this.bitmap.data[idx2 + 3] === color[3]
        )) {
            return false;
        }
    }

    return true;
}

export default () => ({
    checkAreaIsSameColor
});
