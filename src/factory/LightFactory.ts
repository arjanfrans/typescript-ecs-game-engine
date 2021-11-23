import { Entity } from "../ecs/entities/Entity";
import { PositionComponent } from "../ecs/components/PositionComponent";
import { Vector3 } from "three";
import { LightComponent } from "../ecs/components/LightComponent";

export class LightFactory {
    private constructor() {}

    public static create(position: Vector3): Entity {
        return new Entity([
            new PositionComponent(position.x, position.y, position.z),
            new LightComponent(),
        ]);
    }
}
