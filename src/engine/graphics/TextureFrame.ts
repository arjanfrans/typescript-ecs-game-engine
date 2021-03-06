import { Geometry, Texture, Vector2 } from "three";
import { TextureAtlas } from "./TextureAtlas";

export class TextureFrame {
    private textureAtlas: TextureAtlas;
    private readonly geometry: Geometry;
    private readonly fixed: boolean;
    private width: number = 0;
    private height: number = 0;

    constructor(textureAtlas: TextureAtlas, geometry: Geometry, fixed = false) {
        this.textureAtlas = textureAtlas;
        this.geometry = geometry;
        this.fixed = fixed;
    }

    get texture(): Texture {
        return this.textureAtlas.texture;
    }

    _changeSize(width, height) {
        this.width = width;
        this.height = height;
        const aw = this.textureAtlas.width;
        const ah = this.textureAtlas.height;

        if (this.geometry) {
            // TODO make this more efficient (no new instances necessary)
            const bounds = [
                new Vector2(0, ah / ah), // lower left
                new Vector2(0, (ah - height) / ah), // upper left
                new Vector2(width / aw, (ah - height) / ah), // upper right
                new Vector2(width / aw, ah / ah), // lower right
            ];

            // If a geometry is merged, for example multiple planes
            for (let i = 1; i < this.geometry.faceVertexUvs[0].length; i += 2) {
                this.geometry.faceVertexUvs[0][i - 1] = [
                    bounds[0],
                    bounds[1],
                    bounds[3],
                ];
                this.geometry.faceVertexUvs[0][i] = [
                    bounds[1],
                    bounds[2],
                    bounds[3],
                ];
            }

            this.geometry.uvsNeedUpdate = true;
        }
    }

    set frame(frameName) {
        const offset = this.textureAtlas.getFrameOffset(frameName);
        const size = this.textureAtlas.getFrameSize(frameName);

        // Size changed
        if (!this.fixed) {
            if (size.width !== this.width || size.height !== this.height) {
                this._changeSize(size.width, size.height);
            }
        }

        this.texture.offset = offset;
    }
}
