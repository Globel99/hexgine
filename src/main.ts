import { Mesh, MeshLambertMaterial, ConeGeometry, Fog, Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MountainInstances } from './mesh/instanced/mountain-instances';

import './light';

import RenderLoop from './render-loop';
import ControlLoop from './control';

import { scene, camera, renderer } from './base';
import Map from './group/map';

const map = new Map(1, 2, 5);
const objloader = new GLTFLoader();
objloader.load(
  '/mountain.glb',
  function (gltf) {
    console.log('original', gltf.scene);
    console.log(gltf.scene.children[0]);
    const scene1 = gltf.scene.clone();
    const scene2 = gltf.scene.clone();
    const scene3 = gltf.scene.clone();

    const mountains = new MountainInstances(scene1, 0);
    const mountains2 = new MountainInstances(scene2, 1);
    const mountains3 = new MountainInstances(scene3, 2);

    const group = new Group();
    group.add(mountains.group);
    group.add(mountains2.group);
    group.add(mountains3.group);
    scene.add(group);
    scene.fog = new Fog(0xcccccc, 5, 140);
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

const testMesh = new Mesh(new ConeGeometry(1, 4, 5, 6), new MeshLambertMaterial());

//scene.add(map);
//scene.add(testMesh);

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
