import { EntityManager } from "../EntityManager";
import { Entity } from "../Entity";
import { PositionComponent } from "../../components/PositionComponent";
import { LightComponent } from "../../components/LightComponent";

export class LightQuery {
    private constructor() {}

    public static getLightEntities(em: EntityManager): Entity[] {
        return em.getEntitiesWithTypes([
            PositionComponent.TYPE,
            LightComponent.TYPE,
        ]);
    }
}
