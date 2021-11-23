import { Mesh, Object3D } from "three";

export abstract class View {
    public mesh?: Object3D = undefined;

    set position({ x, y, z }: { x?: number; y?: number; z?: number }) {
        if (this.mesh) {
            if (x) {
                this.mesh.position.x = x;
            }

            if (y) {
                this.mesh.position.y = y;
            }

            if (z) {
                this.mesh.position.z = z;
            }
        }
    }

    public getMesh(): Object3D | Mesh {
        return this.mesh as Object3D | Mesh;
    }

    public abstract update(interpolationPercentage: number);
}
