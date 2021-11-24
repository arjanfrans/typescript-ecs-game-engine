import { AbstractState } from "../engine/state/AbstractState";
import { Engine } from "../engine/Engine";
import { EntityManager } from "../ecs/entities/EntityManager";
import { SystemInterface } from "../ecs/systems/SystemInterface";
import { MovementSystem } from "../ecs/systems/MovementSystem";
import { ComputerControllableSystem } from "../ecs/systems/ComputerControllableSystem";
import { PlayerControllableSystem } from "../ecs/systems/PlayerControllableSystem";

export class PlayState extends AbstractState {
    public readonly em: EntityManager = new EntityManager();
    private readonly systems: SystemInterface[] = [];
    public isPaused: boolean = false;

    constructor(engine: Engine) {
        super("play", engine);

        this.systems.push(
            new PlayerControllableSystem(this, engine.inputSources)
        );
        this.systems.push(new ComputerControllableSystem(this.em));
        this.systems.push(new MovementSystem(this.em));
    }

    update(delta: number): void {
        for (const system of this.systems) {
            if (system instanceof PlayerControllableSystem) {
                system.update(delta);
            } else if (!this.isPaused) {
                system.update(delta);
            }
        }
    }
}
