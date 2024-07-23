import { GUI } from 'dat.gui';
import { scene, camera, renderer } from './base';

import { AmbientLight, HemisphereLight, PointLight } from 'three';

const pointLight = new PointLight(0xffffff, 15);
pointLight.castShadow = true;
pointLight.position.y = 50;

const lights = {
  hemisphere: new HemisphereLight(0xf6e86d, 0x404040, 0.5),
  pointLight,
  ambientLight: new AmbientLight(0xff22dd, 2),
};

const gui = new GUI();
const folder1 = gui.addFolder('light-source');

const min = -50;
const max = 100;

folder1.add(pointLight.position, 'x', min, max);
folder1.add(pointLight.position, 'y', min, max);
folder1.add(pointLight.position, 'z', min, max);
folder1.open();

scene.add(lights.pointLight);
