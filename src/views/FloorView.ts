import {
    AxisHelper,
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
} from "three";
import { View } from "../engine/graphics/View";
import { PlayState } from "../state/PlayState";
import { EntityManager } from "../ecs/entities/EntityManager";

export class FloorView extends View {
    private readonly em: EntityManager;

    constructor(playState: PlayState) {
        super();

        this.em = playState.em;

        this.mesh = new Mesh();

        const worldWidth = 500,
            worldHeight = 500;

        const material = new MeshBasicMaterial({
            color: 0xaadea4,
            wireframe: false,
            wireframeLinewidth: 1,
            side: FrontSide,
        });
        const geometry = new PlaneGeometry(worldWidth, worldHeight);

        this.mesh = new Mesh(geometry, material);

        const axes = new AxisHelper(100);
        this.mesh.add(axes);

        this.mesh.position.z = 0;
    }

    update(interpolationPercentage: number) {}
}
