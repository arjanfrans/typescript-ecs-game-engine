import { Engine } from "../../engine/Engine";
import { PlayState } from "../../state/PlayState";
import { PlayerFactory } from "../../factory/PlayerFactory";
import { LightFactory } from "../../factory/LightFactory";
import { Vector3 } from "three";

export class PlayStateBuilder {
    constructor(private readonly engine: Engine) {}

    public build(): PlayState {
        const playState = new PlayState(this.engine);

        const player = PlayerFactory.create(new Vector3(100, 100, 0));
        const light = LightFactory.create(new Vector3(3, 1, 100));

        playState.em.addEntity(player);
        playState.em.addEntity(light);

        return playState;
    }
}
