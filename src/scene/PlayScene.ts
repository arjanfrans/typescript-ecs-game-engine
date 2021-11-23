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
import {View} from "../engine/graphics/View";

export class PlayScene extends ThreeScene {
    public camera?: PerspectiveCamera = undefined;
    private map: any;
    private _cameraFollowView?: any;
    private _cameraFollowLight?: SpotLight;

    constructor(state: PlayState) {
        super();

        this.map = state.map;
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

        this.camera = new PerspectiveCamera(
            75,
            this.map.width / this.map.height,
            100,
            1000
        );

        this.getCamera().position.x =
            (this.map.width / 2) * this.map.blockWidth;
        this.getCamera().position.y =
            (this.map.height / 2) * this.map.blockHeight;
        this.getCamera().position.z = this.map.blockDepth * 6;

        const ambientLight = new AmbientLight(0xffffff);

        this.scene.add(ambientLight);
    }

    update(delta: number) {
        super.update(delta);

        if (this.cameraFollowView) {
            this.getCamera().position.setX(this.cameraFollowView.getMesh().position.x);
            this.getCamera().position.setY(this.cameraFollowView.getMesh().position.y);
        }
    }

    getCamera(): Camera | OrthographicCamera | PerspectiveCamera {
        return this.camera as PerspectiveCamera;
    }
}
