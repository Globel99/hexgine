import { Scene as ThreeScene } from 'three';

export class Scene {
  private static scene: ThreeScene;

  public static getScene(): ThreeScene {
    if (!this.scene) {
      this.scene = new ThreeScene();
    }

    return this.scene;
  }
}
