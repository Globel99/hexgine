import { PerspectiveCamera } from 'three';

export class Camera {
  private static camera: PerspectiveCamera;

  public static getCamera(): PerspectiveCamera {
    if (!this.camera) {
      this.camera = new PerspectiveCamera(160, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.set(0, 50, -50);
    }

    return this.camera;
  }
}
