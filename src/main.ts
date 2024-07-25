import { Fog } from 'three';
import { HexaPositions } from './hexa-positions';
import { loadModel } from './utils/load-model';
import { InstancedTileGroup } from './mesh/instanced/instanced-tile-group';

import './light';

import RenderLoop from './render-loop';
import ControlLoop from './control';

import { scene } from './base';

const positions: {
  mountain: { x: number; z: number }[];
  sea: { x: number; z: number }[];
  grass: { x: number; z: number }[];
} = {
  mountain: [],
  sea: [],
  grass: [],
};

for (let x = 0; x < 100; x++) {
  for (let y = 0; y < 100; y++) {
    const rand = Math.random();
    if (rand > 0.3 && rand < 0.7) {
      positions.grass.push({ x, z: y });
      continue;
    }

    if (rand > 0.8) {
      positions.sea.push({ x, z: y });
      continue;
    }

    positions.mountain.push({ x, z: y });
  }
}

scene.fog = new Fog(0xcccccc, 100, 600);

const models = await loadModel('mountain2', 'sea', 'grass');

console.log(models.sea, 'sea');

const mountains = new InstancedTileGroup(models.mountain2, new HexaPositions(positions.mountain));
const seas = new InstancedTileGroup(models.sea, new HexaPositions(positions.sea));
const grasses = new InstancedTileGroup(models.grass, new HexaPositions(positions.grass));

scene.add(mountains);
scene.add(seas);
scene.add(grasses);

const renderLoop = new RenderLoop();
const controlLoop = new ControlLoop();

controlLoop.start();
renderLoop.start();
