import * as Three from "three";

export default function (element: HTMLElement): {
  scene: Three.Scene;
  camera: Three.Camera;
  renderer: Three.WebGLRenderer;
} {
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  element.appendChild(renderer.domElement);

  console.log(element);

  return {
    scene,
    camera,
    renderer,
  };
}
