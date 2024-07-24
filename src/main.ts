import { Fog, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { HexaPositions } from './hexa-positions';
import { InstancedTileGroup } from './mesh/instanced/instanced-tile-group';

import './light';

import RenderLoop from './render-loop';
import ControlLoop from './control';

import { scene } from './base';

const objloader = new GLTFLoader();
objloader.load(
  '/mountain2.glb',
  function (gltf) {
    console.log('original', gltf.scene);
    console.log(gltf.scene.children[0]);

    const positions: { x: number; z: number }[] = [];

    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        positions.push({ x, z: y });
      }
    }

    const pos = new HexaPositions(positions);

    const merged = new InstancedTileGroup(gltf.scene.clone().children[0].children as Mesh[], pos);

    scene.add(merged);

    console.log(scene);

    scene.fog = new Fog(0xcccccc, 5, 180);
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },

  // onError callback
  function (err) {
    console.error('An error happened');
  },
);

const renderLoop = new RenderLoop();
const controlLoop = new ControlLoop();

controlLoop.start();
renderLoop.start();
