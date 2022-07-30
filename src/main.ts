import { OrbitControls } from '@three-ts/orbit-controls';
import { DirectionalLight } from 'three';

import './gui/camera-gui';

import RenderLoop from './render-loop';
import { scene, camera, renderer } from './base';
import Map from './group/map';

const map = new Map(10, 10, 20);

camera.position.set(60, 50, 0);

const light = new DirectionalLight(0xffffff, 1.5);
light.position.set(50, 20, 50);
light.target.position.set(1000, 0, 1000);
light.castShadow = true;

scene.add(map);
scene.add(light);
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
