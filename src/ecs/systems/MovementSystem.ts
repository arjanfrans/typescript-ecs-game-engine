import { Entity } from "../entities/Entity";
import { PositionComponent } from "../components/PositionComponent";
import { MovementComponent } from "../components/MovementComponent";
import { EntityManager } from "../entities/EntityManager";
import { SystemInterface } from "./SystemInterface";

export class MovementSystem implements SystemInterface {
    public static REQUIRED_COMPONENTS = [
        MovementComponent.TYPE,
        PositionComponent.TYPE,
    ];
    private em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    private getEntities(): Entity[] {
        return this.em.getEntitiesWithTypes(MovementSystem.REQUIRED_COMPONENTS);
    }

    update(delta: number): void {
        for (const entity of this.getEntities()) {
            const movement = entity.getComponent<MovementComponent>(
                MovementComponent.TYPE
            );
            const position = entity.getComponent<PositionComponent>(
                PositionComponent.TYPE
            );

            // console.log(movement.angle, movement.angularVelocity)
            // movement.angle += movement.angularVelocity * delta;
            // // console.log(movement.angularVelocity)
            // if (movement.angularVelocity > 0) {
            movement.angle -= movement.angularVelocity * delta;
            // } else {
            //     movement.angle -= movement.angularVelocity * delta;
            //     console.log(movement.angle * (180 / Math.PI))
            // }

            position.previousPosition.x = position.position.x;
            position.previousPosition.y = position.position.y;

            position.position.x += movement.velocity.x * delta;
            position.position.y += movement.velocity.y * delta;
        }
    }
}
