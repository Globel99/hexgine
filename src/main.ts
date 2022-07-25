import { OrbitControls } from '@three-ts/orbit-controls';
import { Color } from 'three';

import './gui/camera-gui';
import gui from './gui/camera-gui';

import RenderLoop from './render-loop';
import { scene, camera, renderer } from './base';
import Map from './group/map';

const map = new Map(3, 3, 10);

camera.position.set(60, 50, 0);

scene.add(map);
camera.lookAt(scene.position);

/* gui.add(
  {
    set: () => {
      chunk.setColorAt(5, new Color('blue'));
      chunk.instanceColor.needsUpdate = true;
    },
  },
  'set',
); */

const controls = new OrbitControls(camera, renderer.domElement);
const renderLoop = new RenderLoop();
renderLoop.start();
