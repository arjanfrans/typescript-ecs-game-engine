import { BoxGeometry, FrontSide, Mesh, MeshBasicMaterial } from "three";
import { View } from "../engine/graphics/View";
import { PlayState } from "../state/PlayState";
import { EntityManager } from "../ecs/entities/EntityManager";
import { DimensionComponent } from "../ecs/components/DimensionComponent";
import { PositionComponent } from "../ecs/components/PositionComponent";
import { Entity } from "../ecs/entities/Entity";
import { PlayerQuery } from "../ecs/entities/queries/PlayerQuery";
import { MovementComponent } from "../ecs/components/MovementComponent";

export class CubeView extends View {
    private readonly em: EntityManager;

    constructor(playState: PlayState) {
        super();

        this.em = playState.em;

        const player = this.getPlayer();

        const playerDimension = player.getComponent<DimensionComponent>(
            DimensionComponent.TYPE
        );
        const playerPosition = player.getComponent<PositionComponent>(
            PositionComponent.TYPE
        );

        const geometry = new BoxGeometry(
            playerDimension.height,
            playerDimension.width,
            100
        );

        geometry.translate(0, 0, 50);

        const material = new MeshBasicMaterial({
            color: 0xfc7f03,
            wireframe: false,
            wireframeLinewidth: 1,
            side: FrontSide,
        });

        this.mesh = new Mesh(geometry, material);

        this.mesh.position.set(
            playerPosition.position.x,
            playerPosition.position.y,
            playerPosition.position.z
        );
    }

    private getPlayer(): Entity {
        return PlayerQuery.getPlayerEntity(this.em);
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

        this.getMesh().position.x =
            previous.x + (current.x - previous.x) * interpolationPercentage;
        this.getMesh().position.y =
            previous.y + (current.y - previous.y) * interpolationPercentage;

        this.getMesh().rotation.z = playerMovement.angle;
    }
}
