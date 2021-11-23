import { EntityManager } from "../EntityManager";
import { Entity } from "../Entity";
import { PlayerControllableComponent } from "../../components/PlayerControllableComponent";
import {PositionComponent} from "../../components/PositionComponent";
import {MovementComponent} from "../../components/MovementComponent";
import {DimensionComponent} from "../../components/DimensionComponent";

export class PlayerQuery {
    private constructor() {}

    public static getPlayerEntity(em: EntityManager): Entity {
        const entities = em.getEntitiesWithTypes([
            PlayerControllableComponent.TYPE,
            PositionComponent.TYPE,
            MovementComponent.TYPE,
            DimensionComponent.TYPE
        ]);

        if (entities.length !== 1) {
            throw new Error("No player entity found");
        }

        return entities[0];
    }
}
