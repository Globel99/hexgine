export default class {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.Renderer
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  animate(callback) {
    requestAnimationFrame(() => {
      callback();
    });
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    console.log(this.animate);
    this.animate(this.animate);
  }
}
