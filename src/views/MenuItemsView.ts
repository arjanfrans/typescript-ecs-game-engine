import { Object3D } from "three";
import { View } from "../engine/graphics/View";
import { MenuState } from "../state/MenuState";
import { MenuItem } from "../engine/menu-system/MenuItem";
import { TextView } from "../engine/graphics/TextView";

export class MenuItemsView extends View {
    private viewMenuItemPairs: Map<MenuItem, TextView> = new Map();
    private selectedItem?: MenuItem;

    constructor(private readonly menuState: MenuState) {
        super();

        this.init();
    }

    init() {
        this.mesh = new Object3D();

        const distance = 100;
        const startY = 200;
        let itemCount = 0;

        const currentMenu = this.menuState.getCurrentMenu();
        this.selectedItem = currentMenu.selectedItem;

        for (const menuItem of currentMenu.menuItems.values()) {
            const textView = new TextView(menuItem.text, {
                width: 300,
            });

            textView.getMesh().position.y = startY - distance * itemCount;
            textView.getMesh().position.x += 100;

            if (this.selectedItem === menuItem) {
                textView.color = 0x00ff00;
            } else {
                textView.color = 0xffdddd;
            }

            this.viewMenuItemPairs.set(menuItem, textView);

            this.mesh.add(textView.getMesh());
            itemCount += 1;
        }
    }

    update() {
        const currentMenu = this.menuState.getCurrentMenu();

        // Selected item changed
        if (this.selectedItem !== currentMenu.selectedItem) {
            const previousItem = this.selectedItem;

            this.selectedItem = currentMenu.selectedItem;

            const currentView = this.viewMenuItemPairs.get(this.selectedItem);

            if (currentView) {
                currentView.text = this.selectedItem.text;
                currentView.color = 0x00ff00;
            }

            if (previousItem) {
                const previousView = this.viewMenuItemPairs.get(previousItem);

                if (previousView) {
                    previousView.color = 0xffdddd;
                }
            }
        }
    }
}
