import { scene, camera, renderer } from './base';

export default class {
  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    renderer.render(scene, camera);
  }

  start() {
    this.animate();
  }
}
