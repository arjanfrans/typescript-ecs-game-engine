import { Camera, Object3D, Vector3 } from "three";

export class ThirdPersonCamera {
    private currentPosition: Vector3 = new Vector3();
    private currentLookAt: Vector3 = new Vector3();

    constructor(
        private readonly camera: Camera,
        private readonly target: Object3D
    ) {}

    update(delta: number): void {
        const idealOffset: Vector3 = new Vector3(
            this.target.position.x,
            this.target.position.y - 200,
            this.target.position.z + 400
        );
        const idealLookAt: Vector3 = this.calculateIdealLookAt();

        this.currentPosition.copy(idealOffset);
        this.currentLookAt.copy(idealLookAt);

        this.camera.position.copy(this.currentPosition);
        this.camera.lookAt(this.currentLookAt);
    }

    private calculateIdealLookAt(): Vector3 {
        const idealLookAt = new Vector3(0, 0, 0);

        idealLookAt.applyQuaternion(this.target.quaternion);
        idealLookAt.add(this.target.position);

        return idealLookAt;
    }
}
