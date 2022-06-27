import { GUI } from 'dat.gui';
import { camera } from '../base';

const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');

cameraFolder.add(camera.position, 'x', 0, 10);
cameraFolder.add(camera.position, 'y', 0, 10);
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();
