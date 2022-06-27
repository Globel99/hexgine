import * as Three from 'three';

export class Scene {
  private static scene: THREE.Scene;

  public static getScene(): THREE.Scene {
    if (!this.scene) {
      this.scene = new Three.Scene();
    }

    return this.scene;
  }
}
