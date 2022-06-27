import * as Three from 'three';
import RenderLoop from './render-loop';
import { scene, camera } from './base';
import './gui/camera-gui';

const geometry = new Three.CylinderGeometry(1, 1, 2, 6, 1);
const material = new Three.MeshNormalMaterial();

const hex = new Three.Mesh(geometry, material);
camera.position.z = 8;
camera.position.x = 3;
camera.position.y = 2;

scene.add(hex);

const renderLoop = new RenderLoop();
renderLoop.start();
