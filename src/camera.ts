import * as Three from 'three';

export class Camera {
  private static camera: THREE.PerspectiveCamera;

  public static getCamera(): THREE.PerspectiveCamera {
    if (!this.camera) {
      this.camera = new Three.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 50, -50);
    }

    return this.camera;
  }
}
