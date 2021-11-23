import { MenuState } from "../state/MenuState";
import { GamepadInputSource } from "../engine/input/GamepadInputSource";
import { KeyboardInputSource } from "../engine/input/KeyboardInputSource";
import { InputSourceInterface } from "../engine/input/InputSourceInterface";
import { Keyboard } from "../engine/input/Keyboard";
import { Keys } from "../engine/input/Keys";
import { Gamepad } from "../engine/input/Gamepad";

export class MenuInputSystem {
    private gamepad?: Gamepad;
    private keyboard: Keyboard;

    constructor(
        inputSources: Map<string, InputSourceInterface>,
        private readonly state: MenuState
    ) {
        const keyboardInputSource = inputSources.get("keyboard");
        const gamepadInputSource = inputSources.get("gamepad") as
            | GamepadInputSource
            | undefined;

        if (!(keyboardInputSource instanceof KeyboardInputSource)) {
            throw new Error("No keyboard input");
        }

        this.keyboard = keyboardInputSource.keyboard;
        this.gamepad = gamepadInputSource?.gamepad;
    }

    update() {
        const currentMenu = this.state.getCurrentMenu();

        if (
            this.keyboard.keyboardDownOnce(Keys.UP) ||
            this.gamepad?.isStickDown("left", "up")
        ) {
            currentMenu.moveUp();
        } else if (
            this.keyboard.keyboardDownOnce(Keys.DOWN) ||
            this.gamepad?.isStickDown("left", "down")
        ) {
            currentMenu.moveDown();
        }

        if (
            this.keyboard.keyboardDownOnce(Keys.ENTER) ||
            this.keyboard.keyboardDownOnce(Keys.SPACE) ||
            this.gamepad?.gamepadButtonDownOnce("actionSouth")
        ) {
            currentMenu.selectCurrentItem();
        }
    }
}
