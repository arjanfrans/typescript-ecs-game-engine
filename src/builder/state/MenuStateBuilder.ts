import Menu from "../../engine/menu-system/Menu";
import { MenuItem } from "../../engine/menu-system/MenuItem";
import { Engine } from "../../engine/Engine";
import { MenuState } from "../../state/MenuState";

export class MenuStateBuilder {
    constructor(private readonly engine: Engine) {}

    public build(): MenuState {
        const menuState = new MenuState(this.engine);
        const mainMenu = new Menu();

        const playItem = new MenuItem("play", "Play", () => {
            this.engine.changeState("play");
        });
        const helpItem = new MenuItem("help", "Help");

        mainMenu.addMenuItem(playItem);
        mainMenu.addMenuItem(helpItem);

        const menus = new Map();

        menus.set("main", mainMenu);

        menuState.addMenu("main", mainMenu);

        return menuState;
    }
}
