import {
    AxisHelper,
    FrontSide,
    Geometry,
    Matrix4,
    Mesh,
    MeshLambertMaterial,
    PlaneGeometry,
} from "three";
import { View } from "../engine/graphics/View";
import { TextureManager } from "../engine/graphics/TextureManager";
import { TextureFrame } from "../engine/graphics/TextureFrame";
import { PlayState } from "../state/PlayState";
import { EntityManager } from "../ecs/entities/EntityManager";

export class FloorView extends View {
    private readonly em: EntityManager;

    constructor(playState: PlayState) {
        super();

        this.em = playState.em;
        this.init();
    }

    private init() {
        this.mesh = new Mesh();

        const textureAtlas = TextureManager.getAtlas("tiles", true);

        const worldWidth = 20,
            worldDepth = 20;
        const worldHalfWidth = worldWidth / 2;
        const worldHalfDepth = worldDepth / 2;
        const matrix = new Matrix4();

        const baseGeometry = new PlaneGeometry(100, 100);
        const mergedGeometry = new Geometry();

        for (let z = 0; z < worldDepth; z++) {
            for (let x = 0; x < worldWidth; x++) {
                matrix.makeTranslation(
                    x * 100 - worldHalfWidth * 100,
                    z * 100 - worldHalfDepth * 100,
                    0
                );

                mergedGeometry.merge(baseGeometry.clone().applyMatrix(matrix));
            }
        }

        mergedGeometry.mergeVertices();
        mergedGeometry.computeBoundingBox();
        mergedGeometry.computeBoundingSphere();

        const textureFrame = new TextureFrame(textureAtlas, mergedGeometry);

        textureFrame.frame = "grass_center";

        const material = new MeshLambertMaterial({
            map: textureFrame.texture,
            transparent: false,
            wireframe: false,
            side: FrontSide,
        });

        this.mesh = new Mesh(mergedGeometry, material);

        const axes = new AxisHelper(100);
        this.mesh.add(axes);

        this.mesh.position.z = -1;
    }

    update(interpolationPercentage: number) {}
}
