import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { View } from "../engine/graphics/View";
import { TextureManager } from "../engine/graphics/TextureManager";
import { EntityManager } from "../ecs/entities/EntityManager";
import { PlayState } from "../state/PlayState";
import { PlayerQuery } from "../ecs/entities/queries/PlayerQuery";
import { DimensionComponent } from "../ecs/components/DimensionComponent";
import { PositionComponent } from "../ecs/components/PositionComponent";
import { Entity } from "../ecs/entities/Entity";
import { MovementComponent } from "../ecs/components/MovementComponent";
import { TextureFrame } from "../engine/graphics/TextureFrame";

export class PlayerView extends View {
    private readonly em: EntityManager;
    private cachedPlayer?: Entity;

    constructor(playState: PlayState) {
        super();

        this.em = playState.em;

        this.init();
    }

    private getPlayer(): Entity {
        if (!this.cachedPlayer) {
            this.cachedPlayer = PlayerQuery.getPlayerEntity(this.em);
        }

        return this.cachedPlayer;
    }

    private init() {
        const player = this.getPlayer();

        const playerDimension = player.getComponent<DimensionComponent>(
            DimensionComponent.TYPE
        );
        const playerPosition = player.getComponent<PositionComponent>(
            PositionComponent.TYPE
        );

        const geometry = new PlaneGeometry(
            playerDimension.height * 2,
            playerDimension.width * 2
        );

        geometry.rotateZ(Math.PI);

        const textureAtlas = TextureManager.getAtlas("soldier", true);
        const textureFrame = new TextureFrame(textureAtlas, geometry);

        textureFrame.frame = "soldier_weapon_idle_0001";

        const material = new MeshLambertMaterial({
            map: textureFrame.texture,
            transparent: true,
        });

        this.mesh = new Mesh(geometry, material);

        this.mesh.position.set(
            playerPosition.position.x,
            playerPosition.position.y,
            playerPosition.position.z
        );
    }

    update(interpolationPercentage: number) {
        const player = this.getPlayer();

        const playerPosition = player.getComponent<PositionComponent>(
            PositionComponent.TYPE
        );
        const playerMovement = player.getComponent<MovementComponent>(
            MovementComponent.TYPE
        );

        const previous = playerPosition.previousPosition;
        const current = playerPosition.position;

        if (this.mesh) {
            this.mesh.position.x =
                previous.x + (current.x - previous.x) * interpolationPercentage;
            this.mesh.position.y =
                previous.y + (current.y - previous.y) * interpolationPercentage;

            this.mesh.rotation.z = playerMovement.angle + 90 * (Math.PI / 180);
        }
    }
}
