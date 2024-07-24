import { GUI } from 'dat.gui';
import { scene } from './base';

import { AmbientLight, HemisphereLight, PointLight, DirectionalLight } from 'three';

const pointLight = new PointLight(0xffffff, 15);
pointLight.castShadow = true;
pointLight.position.y = 50;

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.position.set(50, 100, 10);
directionalLight.target.position.set(10, 10, 10);

const lights = {
  hemisphere: new HemisphereLight(0xf6e86d, 0x404040, 0.5),
  pointLight,
  ambientLight: new AmbientLight(0xff22dd, 2),
  directionalLight,
};

const gui = new GUI();
const folder1 = gui.addFolder('light-source');

const min = -150;
const max = 200;

folder1.add(pointLight.position, 'x', min, max);
folder1.add(pointLight.position, 'y', min, max);
folder1.add(pointLight.position, 'z', min, max);
folder1.open();

const l = new DirectionalLight(0xffffff, 1);
l.position.set(5, 100, 5); // Position the light to simulate sunlight
l.target.position.set(500, 50, 0); // Position the target to light the scene
l.castShadow = true; // Enable shadows
l.shadow.camera.near = 0.1;
l.shadow.camera.far = 25;
l.shadow.camera.left = -10;
l.shadow.camera.right = 10;
l.shadow.camera.top = 10;
l.shadow.camera.bottom = -10;

scene.add(l);
