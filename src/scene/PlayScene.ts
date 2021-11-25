import {
    AmbientLight,
    Camera,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    SpotLight,
} from "three";
import { ThreeScene } from "../engine/renderer/render-view/ThreeScene";
import { Dimension } from "../engine/math/Dimension";
import { PlayState } from "../state/PlayState";
import { View } from "../engine/graphics/View";
import { ThirdPersonCamera } from "../engine/camera/ThirdPersonCamera";

export class PlayScene extends ThreeScene {
    public camera?: PerspectiveCamera = undefined;
    private _cameraFollowView?: any;
    private _cameraFollowLight?: SpotLight;
    private thirdPersonCamera?: ThirdPersonCamera;

    constructor(state: PlayState) {
        super();

        this.camera = new PerspectiveCamera(75, 4 / 3, 100, 1000);
        this.camera.position.z = 100 * 4;
        // this.camera.rotateY(90 * (Math.PI / 180))
    }

    get cameraFollowView(): View {
        return this._cameraFollowView as View;
    }

    set cameraFollowView(view: View) {
        this._cameraFollowView = view;

        this.thirdPersonCamera = new ThirdPersonCamera(
            this.getCamera(),
            view.getMesh()
        );
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

        const ambientLight = new AmbientLight(0xafffff);

        this.scene.add(ambientLight);
    }

    update(delta: number) {
        super.update(delta);

        if (this.cameraFollowView) {
            if (this.thirdPersonCamera) {
                this.thirdPersonCamera.update(delta);
            } else {
                this.getCamera().position.setX(
                    this.cameraFollowView.getMesh().position.x
                );
                this.getCamera().position.setY(
                    this.cameraFollowView.getMesh().position.y
                );
            }
        }
    }

    getCamera(): Camera {
        const camera = this.camera;

        if (!camera) {
            throw new Error("no camera");
        }

        return camera;
    }
}
