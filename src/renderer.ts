import * as Three from 'three';

export class Renderer {
  private static renderer: THREE.WebGLRenderer;

  public static getRenderer(): THREE.WebGLRenderer {
    if (!this.renderer) {
      this.renderer = new Three.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);
    }

    return this.renderer;
  }
}
