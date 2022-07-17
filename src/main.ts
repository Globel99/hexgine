import './gui/camera-gui';
import { OrbitControls } from '@three-ts/orbit-controls';
import { Color } from 'three';

import RenderLoop from './render-loop';
import { scene, camera, renderer } from './base';
import Chunk from './chunk';
import gui from './gui/camera-gui';

const chunk = new Chunk(10, 10);

camera.position.set(60, 50, 0);
camera.lookAt(scene.position);
scene.add(chunk);

gui.add(
  {
    set: () => {
      chunk.setColorAt(5, new Color('blue'));
      chunk.instanceColor.needsUpdate = true;
    },
  },
  'set',
);

const controls = new OrbitControls(camera, renderer.domElement);
const renderLoop = new RenderLoop();
renderLoop.start();
