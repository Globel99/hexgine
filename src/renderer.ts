import { WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping } from 'three';

export class Renderer {
  private static renderer: WebGLRenderer;

  public static getRenderer(): WebGLRenderer {
    if (!this.renderer) {
      this.renderer = new WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0x000000, 1);
      this.renderer.outputEncoding = sRGBEncoding;
      this.renderer.toneMapping = ACESFilmicToneMapping;

      document.body.appendChild(this.renderer.domElement);
    }

    return this.renderer;
  }
}
