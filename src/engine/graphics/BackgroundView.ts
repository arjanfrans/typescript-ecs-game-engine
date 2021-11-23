import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { TextureManager } from "./TextureManager";
import { TextureFrame } from "./TextureFrame";
import { View } from "./View";

class BackgroundView extends View {
    private _lightness: number;
    private readonly textureName: string;
    private readonly textureAtlasName: string;
    private _width: number;
    private _height: number;
    private material?: MeshBasicMaterial;

    constructor(textureName: string, textureAtlasName: string) {
        super();

        this.textureName = textureName;
        this.textureAtlasName = textureAtlasName;
        this._width = 0;
        this._height = 0;
        this._lightness = 1;

        this.init();
    }

    private init() {
        const textureAtlas = TextureManager.getAtlas(
            this.textureAtlasName,
            true
        );
        const size = textureAtlas.getFrameSize(this.textureName);

        this._width = size.width;
        this._height = size.height;

        const geometry = new PlaneGeometry(size.width, size.height);

        const textureFrame = new TextureFrame(textureAtlas, geometry);

        this.material = new MeshBasicMaterial({
            map: textureFrame.texture,
            transparent: true,
        });

        const hsl = this.material.color.getHSL();

        this.material.color.setHSL(hsl.h, hsl.s, this._lightness);

        this.mesh = new Mesh(geometry, this.material);
    }

    set lightness(lightness) {
        if (this.material) {
            const hsl = this.material.color.getHSL();

            this.material.color.setHSL(hsl.h, hsl.s, lightness);

            this._lightness = lightness;
        }
    }

    get lightness() {
        return this._lightness;
    }

    set width(width) {
        if (this.mesh && this._width) {
            this.mesh.scale.x = width / this._width;
            this.mesh.position.x = width / 2;
        }
    }

    set height(height) {
        if (this.mesh && this._height) {
            this.mesh.scale.y = height / this._height;
            this.mesh.position.y = height / 2;
        }
    }

    update(interpolationPercentage: number) {}
}

export default BackgroundView;
