import { Keyboard } from "./Keyboard";
import { InputSourceInterface } from "./InputSourceInterface";

export class KeyboardInputSource implements InputSourceInterface {
    public readonly keyboard: Keyboard;

    constructor() {
        this.keyboard = new Keyboard();

        global.addEventListener(
            "keyup",
            (event) => {
                event.preventDefault();
                this.keyboard.onKeyup(event);
            },
            false
        );

        global.addEventListener(
            "keydown",
            (event) => {
                event.preventDefault();
                this.keyboard.onKeydown(event);
            },
            false
        );
    }
}
