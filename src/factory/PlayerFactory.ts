import {Entity} from "../ecs/entities/Entity";
import {CollisionComponent} from "../ecs/components/CollisionComponent";
import {MovementComponent} from "../ecs/components/MovementComponent";
import {DimensionComponent} from "../ecs/components/DimensionComponent";
import {PositionComponent} from "../ecs/components/PositionComponent";
import {PlayerControllableComponent} from "../ecs/components/PlayerControllableComponent";
import {Vector3} from "three";

export class PlayerFactory {
    private constructor() {}

    public static create(
        position: Vector3
    ): Entity {
        return new Entity([
            new CollisionComponent(),
            new MovementComponent(),
            new DimensionComponent(48, 48, 1),
            new PositionComponent(position.x, position.y, position.z),
            new PlayerControllableComponent(),
        ]);
    }
}
