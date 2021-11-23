import { MovementComponent } from "../components/MovementComponent";
import { ComputerControllableComponent } from "../components/ComputerControllableComponent";
import { Entity } from "../entities/Entity";
import { SystemInterface } from "./SystemInterface";
import { EntityManager } from "../entities/EntityManager";

export class ComputerControllableSystem implements SystemInterface {
    public static REQUIRED_COMPONENTS = [
        MovementComponent.TYPE,
        ComputerControllableComponent.TYPE,
    ];
    private em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    private getEntities(): Entity[] {
        return this.em.getEntitiesWithTypes(
            ComputerControllableSystem.REQUIRED_COMPONENTS
        );
    }

    update(delta: number): void {
        for (const entity of this.getEntities()) {
            const movement = entity.getComponent<MovementComponent>(
                MovementComponent.TYPE
            );

            if (Math.random() > 0.8) {
                movement.moveUp();
            }

            if (Math.random() > 0.7) {
                if (Math.random() > 0.5) {
                    movement.turnRight();
                } else {
                    movement.turnLeft();
                }
            } else {
                movement.stopTurning();
            }
        }
    }
}
