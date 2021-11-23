import { MenuItem } from "./MenuItem";

export class Menu {
    public readonly menuItems: Map<string, MenuItem> = new Map();
    private readonly menuItemKeys: any[];
    private selectedItemIndex: number;
    private freeze: boolean;

    constructor() {
        this.menuItemKeys = [];
        this.selectedItemIndex = 0;
        this.freeze = false;
    }

    addMenuItem(menuItem: MenuItem) {
        this.menuItemKeys.push(menuItem.name);
        this.menuItems.set(menuItem.name, menuItem);
    }

    get selectedItem(): MenuItem {
        const menuItem = this.menuItems.get(
            this.menuItemKeys[this.selectedItemIndex]
        );

        if (!menuItem) {
            throw new Error("Menu item not found");
        }

        return menuItem;
    }

    moveUp() {
        if (!this.freeze) {
            if (this.selectedItemIndex > 0) {
                this.selectedItemIndex -= 1;
            } else {
                this.selectedItemIndex = 0;
            }
        }
    }

    moveDown() {
        if (!this.freeze) {
            if (this.selectedItemIndex < this.menuItemKeys.length - 1) {
                this.selectedItemIndex += 1;
            } else {
                this.selectedItemIndex = this.menuItemKeys.length - 1;
            }
        }
    }

    selectCurrentItem() {
        this.selectedItem.action();
    }
}

export default Menu;
