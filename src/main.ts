import * as Three from 'three';
import RenderLoop from './render-loop';
import { scene, camera } from './base';
import './gui/camera-gui';
import { Hexagon } from './geometry/hexagon';

const geometry = new Hexagon();
const material = new Three.MeshNormalMaterial();

const hex = new Three.Mesh(geometry, material);

const count = 20;
const hexes = new Three.InstancedMesh(geometry, material, count);

let inRow = 0;
let rowCounter = 1;
const perRow = 5;
new Array(count).fill([]).forEach((v, i) => {
  inRow++;
  if (inRow > perRow) {
    rowCounter++;
    inRow = 1;
  }
  const zDistance = 1.6;
  const xDistance = 1.8;
  const p = 10;
  const matrix = new Three.Matrix4();
  console.log(rowCounter);
  matrix.setPosition(
    i * xDistance - rowCounter * 8.1 - (rowCounter === 3 ? 2 : 0),
    0,
    rowCounter * zDistance,
  );

  hexes.setMatrixAt(i, matrix);
});

camera.position.set(0, 50, 0);
camera.lookAt(scene.position);

scene.add(hexes);

const renderLoop = new RenderLoop();
renderLoop.start();
