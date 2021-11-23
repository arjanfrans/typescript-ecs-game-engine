import {
    Mesh,
    MeshLambertMaterial,
    Object3D,
    PlaneGeometry,
    SpotLight,
    SpotLightHelper,
} from "three";
import { View } from "../engine/graphics/View";
import { TextureManager } from "../engine/graphics/TextureManager";
import { TextureFrame } from "../engine/graphics/TextureFrame";
import { PlayState } from "../state/PlayState";
import { EntityManager } from "../ecs/entities/EntityManager";
import { LightQuery } from "../ecs/entities/queries/LightQuery";
import { PositionComponent } from "../ecs/components/PositionComponent";

export class LightView extends View {
    private readonly em: EntityManager;

    constructor(playState: PlayState) {
        super();

        this.em = playState.em;
        this.init();
    }

    private init() {
        const lights = LightQuery.getLightEntities(this.em);

        this.mesh = new Object3D();

        const textureAtlas = TextureManager.getAtlas("world", true);
        const lightGeometry = new PlaneGeometry(32, 32);

        const textureFrame = new TextureFrame(textureAtlas, lightGeometry);

        const lightMaterial = new MeshLambertMaterial({
            map: textureFrame.texture,
            transparent: true,
        });

        for (const light of lights) {
            const lightMesh = new Mesh(lightGeometry, lightMaterial);

            const lightPosition = light.getComponent<PositionComponent>(
                PositionComponent.TYPE
            );

            lightMesh.position.set(
                lightPosition.position.x,
                lightPosition.position.y,
                lightPosition.position.z
            );

            this.mesh.add(lightMesh);

            const spotLight = new SpotLight(0xff00000, 1);

            spotLight.position.set(
                lightPosition.position.x,
                lightPosition.position.y,
                lightPosition.position.z
            );
            spotLight.angle = Math.PI / 4;
            spotLight.penumbra = 0.1;
            spotLight.decay = 2;
            spotLight.distance = 200;

            spotLight.castShadow = false;
            spotLight.shadow.mapSize.width = 512;
            spotLight.shadow.mapSize.height = 512;

            this.mesh.add(spotLight);

            const lightHelper = new SpotLightHelper(spotLight);

            this.mesh.add(lightHelper);
        }
    }

    update(interpolationPercentage: number) {}
}
