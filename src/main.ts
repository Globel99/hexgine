import { DirectionalLight } from 'three';

import './gui/camera-gui';

import RenderLoop from './render-loop';
import ControlLoop from './control';

import { scene, camera, renderer } from './base';
import Map from './group/map';

const map = new Map(10, 10, 20);

const light = new DirectionalLight(0xffffff, 1.5);
light.position.set(50, 20, 50);
light.target.position.set(1000, 0, 1000);
light.castShadow = true;

scene.add(map);
scene.add(light);
//camera.lookAt(10, 0, 50);

/* gui.add(
  {
    set: () => {
      chunk.setColorAt(5, new Color('blue'));
      chunk.instanceColor.needsUpdate = true;
    },
  },
  'set',
); */

const renderLoop = new RenderLoop();
const controlLoop = new ControlLoop();

controlLoop.start();
renderLoop.start();
