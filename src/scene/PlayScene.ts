import {
    AmbientLight,
    Camera,
    OrthographicCamera,
    PerspectiveCamera,
    SpotLight,
} from "three";
import { ThreeScene } from "../engine/renderer/render-view/ThreeScene";
import { Dimension } from "../engine/math/Dimension";
import { PlayState } from "../state/PlayState";
import { View } from "../engine/graphics/View";

export class PlayScene extends ThreeScene {
    public camera?: PerspectiveCamera = undefined;
    private _cameraFollowView?: any;
    private _cameraFollowLight?: SpotLight;

    constructor(state: PlayState) {
        super();
    }

    get cameraFollowView(): View {
        return this._cameraFollowView as View;
    }

    set cameraFollowView(view: View) {
        this._cameraFollowView = view;
    }

    get cameraFollowLight(): SpotLight {
        return this._cameraFollowLight as SpotLight;
    }

    changeSize(size: Dimension) {
        super.changeSize(size);

        this.init();
    }

    init() {
        super.init();

        this.camera = new PerspectiveCamera(75, 4 / 3, 100, 1000);

        this.getCamera().position.z = 100 * 3;

        const ambientLight = new AmbientLight(0xffffff);

        this.scene.add(ambientLight);
    }

    update(delta: number) {
        super.update(delta);

        if (this.cameraFollowView) {
            this.getCamera().position.setX(
                this.cameraFollowView.getMesh().position.x
            );
            this.getCamera().position.setY(
                this.cameraFollowView.getMesh().position.y
            );
        }
    }

    getCamera(): Camera | OrthographicCamera | PerspectiveCamera {
        return this.camera as PerspectiveCamera;
    }
}
