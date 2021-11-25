import { Engine } from "../../engine/Engine";
import { ViewContainer } from "../../engine/graphics/ViewContainer";
import { PlayState } from "../../state/PlayState";
import { PlayScene } from "../../scene/PlayScene";
import { LightView } from "../../views/LightView";
import { FloorView } from "../../views/FloorView";
import { CubeView } from "../../views/CubeView";

export class PlaySceneBuilder {
    constructor(
        private readonly engine: Engine,
        private readonly playState: PlayState
    ) {}

    public build(): PlayScene {
        const playScene = new PlayScene(this.playState);
        const playerView = new CubeView(this.playState);
        const lightView = new LightView(this.playState);
        const floorView = new FloorView(this.playState);

        playScene.cameraFollowView = playerView;

        const viewContainer = new ViewContainer();

        viewContainer.addDynamicView(playerView);
        viewContainer.addStaticView(lightView);
        viewContainer.addStaticView(floorView);

        playScene.addViewContainer("main", viewContainer);
        playScene.currentViewContainer = "main";

        return playScene;
    }
}
