/**
 * @typedef {import("../index.mjs").JimpPlugins} JimpPlugins
*/

/**
 * @typedef Rectangle
 * 
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {[number, number, number, number]} color
*/

/**
 * @this {JimpPlugins}
 * @returns {Rectangle[]}
*/
function toRectangles() {
    /** @type {Rectangle[]} */
    const rectangles = [];

    const clone = this.clone();

    for (const {x, y, idx} of clone.scanIterator(0, 0, clone.getWidth(), clone.getHeight())) {
        if (clone.bitmap.data[idx + 3] > 0) {
            let width = 1;
            let height = 1;
            /** @type {Rectangle["color"]} */
            const color = [
                clone.bitmap.data[idx],
                clone.bitmap.data[idx + 1],
                clone.bitmap.data[idx + 2],
                clone.bitmap.data[idx + 3]
            ];

            while (true) {
                let found = false;
                if ((x + width + 1) <= clone.getWidth() && clone.checkAreaIsSameColor(x, y, width + 1, height, color)) {
                    found = true;
                    width++;
                }
                if ((y + height + 1) <= clone.getHeight() && clone.checkAreaIsSameColor(x, y, width, height + 1, color)) {
                    found = true;
                    height++;
                }
                if (!found) {
                    break;
                }
            }

            rectangles.push({
                x,
                y,
                width,
                height,
                color
            });

            clone.fillArea(x, y, width, height, [0, 0, 0, 0]);
        }
    }

    return rectangles;
}

/**
 * @this {JimpPlugins}
 * @returns {string}
*/
function toRectanglesSvg() {
    const rectangles = toRectangles.call(this);

    return `<?xml version="1.0" encoding="UTF-8" ?>
<svg height="${this.getHeight()}" width="${this.getWidth()}" xmlns="http://www.w3.org/2000/svg">
${rectangles.map(rectangle => `    <rect ${hexColor(rectangle.color)} height="${rectangle.height}" width="${rectangle.width}" x="${rectangle.x}" y="${rectangle.y}"/>`).join(`
`)}    
</svg>`;
}

/**
 * @param {Rectangle["color"]} color
 * @returns {string}
 */
function hexColor(color) {
    return `fill="#${decToHex(color[0])}${decToHex(color[1])}${decToHex(color[2])}"${color[3] < 255 ? ` fill-opacity="${decToOpacity(color[3])}"` : ``}`

    /**
     * @param {number} dec
     */
    function decToHex(dec) {
        return dec.toString(16).padStart(2, "0").toUpperCase();
    }

    /**
     * @param {number} dec
     */
    function decToOpacity(dec) {
        return (dec / 255);
    }
}

export default () => ({
    toRectangles,
    toRectanglesSvg
});
