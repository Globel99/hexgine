import './gui/camera-gui';

import RenderLoop from './render-loop';
import { scene, camera } from './base';
import Chunk from './chunk';

const chunk = new Chunk(100, 100);

camera.position.set(30, 20, 0);
camera.lookAt(scene.position);

scene.add(chunk);

const renderLoop = new RenderLoop();
renderLoop.start();
