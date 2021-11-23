import MapParser from "./core/maps/MapParser";
import path from "path";
import AssetManager from "./engine/AssetManager";
import { Engine } from "./engine/Engine";
import { KeyboardInputSource } from "./engine/input/KeyboardInputSource";
import { GamepadInputSource } from "./engine/input/GamepadInputSource";
import { PlayState } from "./state/PlayState";
import { DebugThreeRenderer } from "./engine/renderer/DebugThreeRenderer";
import { ViewContainer } from "./engine/graphics/ViewContainer";
import { PlayerFactory } from "./factory/PlayerFactory";
import { PlayScene } from "./scene/PlayScene";
import { PlayerView } from "./views/PlayerView";
import { LightFactory } from "./factory/LightFactory";
import { LightView } from "./views/LightView";
import { Vector3 } from "three";
import { PlayStateBuilder } from "./builder/PlayStateBuilder";
import { MenuStateBuilder } from "./builder/MenuStateBuilder";
import { MenuItemsView } from "./views/MenuItemsView";
import { MenuScene } from "./scene/MenuScene";

const ASSET_PATH = path.resolve(__dirname, "../../assets/");
const ASSET_CONFIG = {
    paths: {
        maps: ASSET_PATH + "/maps",
        atlases: ASSET_PATH + "/spritesheets",
        fonts: ASSET_PATH + "/fonts",
        audio: ASSET_PATH + "/audiosprites",
    },
    textureAtlases: ["soldier", "tiles", "world", "ui"],
    maps: ["level1", "level2"],
    fonts: ["keep_calm"],
    audio: ["guns", "background", "menu_effects"],
};

(async () => {
    await AssetManager.init(ASSET_CONFIG);

    const engine = new Engine({
        renderer: new DebugThreeRenderer({
            div: "root",
            width: 800,
            height: 600,
        }),
        input: {
            keyboard: new KeyboardInputSource(),
            gamepad: new GamepadInputSource(),
        },
    });

    const map = MapParser.parse(AssetManager.getMap("level1"));
    const playState = new PlayStateBuilder(engine, map).build();

    const playScene = new PlayScene(playState);
    const playerView = new PlayerView(playState);
    const lightView = new LightView(playState);

    playScene.cameraFollowView = playerView;

    const viewContainer = new ViewContainer();

    viewContainer.addDynamicView(playerView);
    viewContainer.addStaticView(lightView);

    playScene.addViewContainer("main", viewContainer);
    playScene.currentViewContainer = "main";

    playState.addScene(playScene);

    const menuState = new MenuStateBuilder(engine).build();
    const menuViewContainer = new ViewContainer();

    const menuScene = new MenuScene(menuState);

    menuViewContainer.addDynamicView(new MenuItemsView(menuState));

    menuScene.addViewContainer("main", menuViewContainer);

    menuState.addScene(menuScene);

    engine.addState("menu", menuState);
    engine.addState("play", playState);
    engine.changeState("menu");

    engine.run();
})();
