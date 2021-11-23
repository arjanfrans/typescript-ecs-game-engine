import { Engine } from "../engine/Engine";
import Menu from "../engine/menu-system/Menu";
import { AbstractState } from "../engine/state/AbstractState";
import { MenuInputSystem } from "../menu-input/MenuInputSystem";

export class MenuState extends AbstractState {
    private _currentMenu?: Menu;
    public currentMenuName?: string;
    private menus: Map<string, Menu> = new Map();
    private inputSystem: MenuInputSystem;

    constructor(engine: Engine) {
        super("menu", engine);

        this.inputSystem = new MenuInputSystem(engine.inputSources, this);
    }

    addMenu(name, menu) {
        this.menus.set(name, menu);

        if (!this._currentMenu) {
            this.setCurrentMenu(name);
        }
    }

    setCurrentMenu(name: string) {
        this._currentMenu = this.menus.get(name);

        if (!this._currentMenu) {
            throw new Error('Menu "' + name + '" does not exist');
        }

        this.currentMenuName = name;
    }

    getCurrentMenu(): Menu {
        const currentMenu = this._currentMenu;

        if (!currentMenu) {
            throw new Error("No current menu selected");
        }

        return currentMenu;
    }

    update(delta: number): void {
        this.inputSystem.update();
    }
}
