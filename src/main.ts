import * as Three from 'three';
import RenderLoop from './render-loop';
import { scene, camera } from './base';
import './gui/camera-gui';
import { Hexagon } from './geometry/hexagon';

const geometry = new Hexagon();
const material = new Three.MeshBasicMaterial();

const hex = new Three.Mesh(geometry, material);

const rows = 10;
const columns = 10;

const hexes = new Three.InstancedMesh(geometry, material, rows * columns);

const SIDE = 1;
const A = Math.sqrt(3) / 2;
const d = 0.2;
const EVENODDDIFF = A + d / 2;

const xD = 2 * A + d;
const yD = (3 * SIDE) / 2 + d * A;

let i = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    const evenD = r % 2 ? EVENODDDIFF : 0;
    const x = c * xD + evenD;
    const y = r * yD;

    console.log({ x, y });

    const matrix = new Three.Matrix4();
    matrix.setPosition(x, 1, y);

    hexes.setMatrixAt(i, matrix);

    i += 1;
    const color = 1 / (255 / i);
    hexes.setColorAt(i, new Three.Color(color, color, color));
  }
}

camera.position.set(30, 20, 0);
camera.lookAt(scene.position);

scene.add(hexes);

const renderLoop = new RenderLoop();
renderLoop.start();
