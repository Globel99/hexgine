import { Fog } from 'three';
import { HexaPositions } from './hexa-positions';
import { loadModel } from './utils/load-model';
import { InstancedTileGroup } from './mesh/instanced/instanced-tile-group';
import { Map } from './map';

import './light';

import RenderLoop from './render-loop';
import ControlLoop from './control';

import { scene } from './base';

scene.fog = new Fog(0xcccccc, 0, 1000);

(async () => {
  const models = await loadModel('mountain2', 'sea', 'grass', 'select');

  const select = new InstancedTileGroup(models.select, new HexaPositions([{ x: 0, z: 0 }]));

  const map = new Map();
  window.map = map;
  map.seed();
  map.setSelectBox(select);

  console.log({
    mountain: map.getTilesPositionByType('mountain'),
    sea: map.getTilesPositionByType('sea'),
    grass: map.getTilesPositionByType('grass'),
  });

  const mountains = new InstancedTileGroup(models.mountain2, new HexaPositions(map.getTilesPositionByType('mountain')));
  const seas = new InstancedTileGroup(models.sea, new HexaPositions(map.getTilesPositionByType('sea')));
  const grasses = new InstancedTileGroup(models.grass, new HexaPositions(map.getTilesPositionByType('grass')));

  scene.add(select);
  scene.add(mountains);
  scene.add(seas);
  scene.add(grasses);

  const renderLoop = new RenderLoop();
  const controlLoop = new ControlLoop();

  controlLoop.start();
  renderLoop.start();
})();
