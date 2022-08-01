import * as THREE from 'three';
import CameraControls from 'camera-controls';

import { camera, renderer } from './base';

export default class ControlLoop {
  clock: THREE.Clock;
  control: CameraControls;

  constructor() {
    this.clock = new THREE.Clock();
    CameraControls.install({ THREE: THREE });
    this.control = new CameraControls(camera, renderer.domElement);

    this.control.dollySpeed = 0.5;
    this.control.verticalDragToForward = true;
    this.control.mouseButtons.left = CameraControls.ACTION.TRUCK;
    this.control.zoomTo(10);
    this.control.minDistance = 20;
    this.control.maxDistance = 100;
  }

  start() {
    setInterval(() => {
      const delta = this.clock.getDelta();
      this.control.update(delta);
      console.log(this.control.camera.position.y);
    });
  }
}
