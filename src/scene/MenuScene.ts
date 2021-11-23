import { Camera, OrthographicCamera, PerspectiveCamera } from "three";
import { ThreeScene } from "../engine/renderer/render-view/ThreeScene";
import { MenuState } from "../state/MenuState";
import { Dimension } from "../engine/math/Dimension";

export class MenuScene extends ThreeScene {
    public camera?: OrthographicCamera = undefined;
    private state: MenuState;

    constructor(state: MenuState) {
        super();

        this.state = state;
    }

    init() {
        super.init();

        this.camera = new OrthographicCamera(
            0,
            this.width,
            this.height,
            0,
            0,
            1
        );

        this._initialized = true;
    }

    changeSize(size: Dimension) {
        super.changeSize(size);

        this.init();
    }

    update(delta) {
        super.update(delta);

        if (this.currentViewContainerName !== this.state.currentMenuName) {
            this.currentViewContainer = this.state.currentMenuName;
        }
    }

    getCamera(): Camera | OrthographicCamera | PerspectiveCamera {
        return this.camera as OrthographicCamera;
    }
}
