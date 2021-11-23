import { Object3D } from "three";
import { View } from "./View";

export class ViewContainer {
    private readonly staticViews: Set<View>;
    private readonly dynamicViews: Set<View>;
    private _backgroundView?: View = undefined;
    private _width: number;
    private _height: number;
    private mesh: Object3D = new Object3D();

    constructor() {
        this.staticViews = new Set();
        this.dynamicViews = new Set();
        this._width = 800;
        this._height = 600;

        this.init();
    }

    private init() {
        const backgroundView = this._backgroundView;

        if (backgroundView) {
            const mesh = backgroundView.getMesh();

            mesh.renderOrder = -1;
            this.mesh.add(mesh);
        }

        for (const staticView of this.staticViews) {
            this.mesh.add(staticView.getMesh());
        }

        for (const view of this.dynamicViews) {
            this.mesh.add(view.getMesh());
        }
    }

    set backgroundView(backgroundView) {
        if (backgroundView !== this._backgroundView) {
            backgroundView.width = this._width;
            backgroundView.height = this._height;
            backgroundView.mesh.renderOrder = -1;

            this.mesh.remove(backgroundView.getMesh());

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

    addStaticView(staticView) {
        this.mesh.add(staticView.mesh);

        this.staticViews.add(staticView);
    }

    addDynamicView(dynamicView) {
        this.mesh.add(dynamicView.mesh);

        this.dynamicViews.add(dynamicView);
    }

    set visible(visible) {
        this.mesh.visible = visible;
    }

    get visible() {
        return this.mesh.visible;
    }

    set width(width) {
        const scale = width / this._width;

        this._width = width;

        if (this._backgroundView) {
            // this._backgroundView.width = this._width;
        }

        this.mesh.scale.x = scale;
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld(true);
    }

    set height(height) {
        const scale = height / this._height;

        this._height = height;

        if (this._backgroundView) {
            // this._backgroundView.height = this._height;
        }

        this.mesh.scale.y = scale;
        this.mesh.updateMatrix();
        this.mesh.updateMatrixWorld(true);
    }
}
