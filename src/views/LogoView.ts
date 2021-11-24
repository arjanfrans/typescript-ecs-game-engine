import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { TextureManager } from "../engine/graphics/TextureManager";
import { TextureFrame } from "../engine/graphics/TextureFrame";
import { View } from "../engine/graphics/View";

export class LogoView extends View {
    constructor(textureName, textureAtlasName) {
        super();

        const textureAtlas = TextureManager.getAtlas(textureAtlasName, true);
        const logoSize = textureAtlas.getFrameSize(textureName);

        const geometry = new PlaneGeometry(logoSize.width, logoSize.height);

        const textureFrame = new TextureFrame(
            textureAtlas,
            geometry,
            textureName
        );
        const material = new MeshBasicMaterial({
            map: textureFrame.texture,
            transparent: true,
        });

        this.mesh = new Mesh(geometry, material);
    }

    update(interpolationPercentage: number) {}
}
