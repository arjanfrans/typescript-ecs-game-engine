import { Object3D, Vector3 } from "three";
import { View } from "./View";
import BackgroundView from "./BackgroundView";

export class ViewContainer {
    private readonly staticViews: Set<View>;
    private readonly dynamicViews: Set<View>;
    private _backgroundView?: BackgroundView;
    private _width?: number;
    private _height?: number;
    private mesh: Object3D = new Object3D();

    constructor() {
        this.staticViews = new Set();
        this.dynamicViews = new Set();

        this.init();
    }

    private init() {
        for (const staticView of this.staticViews) {
            this.mesh.add(staticView.getMesh());
        }

        for (const view of this.dynamicViews) {
            this.mesh.add(view.getMesh());
        }
    }

    set backgroundView(backgroundView: BackgroundView) {
        if (backgroundView !== this._backgroundView) {
            if (this._width && this._height) {
                backgroundView.width = this._width;
                backgroundView.height = this._height;
            }

            backgroundView.getMesh().renderOrder = -1;

            if (this._backgroundView) {
                this.mesh.remove(this._backgroundView.getMesh());
            }

            this.mesh.add(backgroundView.getMesh());

            this._backgroundView = backgroundView;
        } else {
            console.warn("backgroundView is the same");
        }
    }

    update(delta) {
        for (const view of this.dynamicViews) {
            view.update(delta);
        }
    }

    addStaticView(staticView: View, position: Vector3 = new Vector3(0, 0, 0)) {
        this.mesh.add(staticView.getMesh());

        staticView.position = { x: position.x, y: position.y, z: position.z };

        this.staticViews.add(staticView);
    }

    addDynamicView(
        dynamicView: View,
        position: Vector3 = new Vector3(0, 0, 0)
    ) {
        this.mesh.add(dynamicView.getMesh());

        dynamicView.position = { x: position.x, y: position.y, z: position.z };

        this.dynamicViews.add(dynamicView);
    }

    set visible(visible) {
        this.mesh.visible = visible;
    }

    get visible() {
        return this.mesh.visible;
    }

    set width(width) {
        const scale = width / (this._width || 1);

        this._width = width;

        if (this._backgroundView) {
            this._backgroundView.width = this._width;
        }

        this.mesh.scale.x = scale;
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld(true);
    }

    set height(height) {
        const scale = height / (this._height || 1);

        this._height = height;

        if (this._backgroundView) {
            this._backgroundView.height = this._height;
        }

        this.mesh.scale.y = scale;
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld(true);
    }
}
