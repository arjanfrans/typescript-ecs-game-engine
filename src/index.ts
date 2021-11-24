import path from "path";
import AssetManager from "./engine/AssetManager";
import { Engine } from "./engine/Engine";
import { KeyboardInputSource } from "./engine/input/KeyboardInputSource";
import { GamepadInputSource } from "./engine/input/GamepadInputSource";
import { DebugThreeRenderer } from "./engine/renderer/DebugThreeRenderer";
import { PlayStateBuilder } from "./builder/state/PlayStateBuilder";
import { MenuStateBuilder } from "./builder/state/MenuStateBuilder";
import { MenuSceneBuilder } from "./builder/scene/MenuSceneBuilder";
import { PlaySceneBuilder } from "./builder/scene/PlaySceneBuilder";

const ASSET_PATH = path.resolve(__dirname, "../../assets/");
const ASSET_CONFIG = {
    paths: {
        atlases: ASSET_PATH + "/spritesheets",
        fonts: ASSET_PATH + "/fonts",
        audio: ASSET_PATH + "/audiosprites",
    },
    textureAtlases: ["soldier", "tiles", "world", "ui"],
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

    const playState = new PlayStateBuilder(engine).build();
    const menuState = new MenuStateBuilder(engine).build();

    menuState.addScene(new MenuSceneBuilder(engine, menuState).build());
    playState.addScene(new PlaySceneBuilder(engine, playState).build());

    engine.addState("menu", menuState);
    engine.addState("play", playState);
    engine.changeState("menu");

    engine.run();
})();
