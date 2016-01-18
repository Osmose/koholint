import PIXI from 'pixi.js';


export class Tileset {
    constructor(texture, tileWidth, tileHeight) {
        this.texture = texture;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.rowWidth = Math.floor(texture.width / tileWidth);
        this.colHeight = Math.floor(texture.height / tileHeight);
    }

    tile(tileNumber) {
        return new PIXI.Texture(this.texture, this.tileRect(tileNumber));
    }

    tileRect(tileNumber) {
        return new PIXI.Rectangle(
            tileNumber * this.tileWidth,
            Math.floor(tileNumber / this.rowWidth) * this.tileHeight,
            this.tileWidth,
            this.tileHeight,
        );
    }
}
