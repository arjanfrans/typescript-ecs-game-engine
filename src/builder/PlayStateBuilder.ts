import { Engine } from "../engine/Engine";
import { PlayState } from "../state/PlayState";
import { PlayerFactory } from "../factory/PlayerFactory";
import { LightFactory } from "../factory/LightFactory";
import { Vector3 } from "three";

export class PlayStateBuilder {
    constructor(private readonly engine: Engine, private map: any) {}

    public build(): PlayState {
        const playState = new PlayState(this.engine, this.map);

        const initialPosition = this.map.randomRespawnPosition();
        const player = PlayerFactory.create(initialPosition);
        const light = LightFactory.create(
            initialPosition.clone().add(new Vector3(0, 0, 100))
        );

        playState.em.addEntity(player);
        playState.em.addEntity(light);

        return playState;
    }
}
