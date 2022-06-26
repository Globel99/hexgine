import * as THREE from "three";
import init from "./init";
import RenderLoop from "./render-loop";

const { scene, camera, renderer } = init(document.body);

const geometry = new THREE.CylinderGeometry(1, 1, 2, 6, 1);
const material = new THREE.MeshNormalMaterial();

const hex = new THREE.Mesh(geometry, material);
camera.position.z = 8;
camera.position.x = 3;
camera.position.y = 2;

scene.add(hex);
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();

/* const renderLoop = new RenderLoop(scene, camera, renderer);
renderLoop.start(); */
