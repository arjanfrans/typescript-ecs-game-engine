import { Engine } from "../../engine/Engine";
import { MenuState } from "../../state/MenuState";
import { MenuScene } from "../../scene/MenuScene";
import { MenuItemsView } from "../../views/MenuItemsView";
import { Vector3 } from "three";
import BackgroundView from "../../engine/graphics/BackgroundView";
import { ViewContainer } from "../../engine/graphics/ViewContainer";

export class MenuSceneBuilder {
    constructor(
        private readonly engine: Engine,
        private readonly menuState: MenuState
    ) {}

    public build(): MenuScene {
        const menuScene = new MenuScene(this.menuState);
        const menuViewContainer = new ViewContainer();

        menuViewContainer.addDynamicView(
            new MenuItemsView(this.menuState),
            new Vector3(400, 200, 0)
        );
        menuViewContainer.backgroundView = new BackgroundView("normandy", "ui");

        menuScene.addViewContainer("main", menuViewContainer);
        menuScene.currentViewContainer = "main";

        return menuScene;
    }
}
