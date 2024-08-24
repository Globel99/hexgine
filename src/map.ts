import { Vector3 } from 'three';
import { MapPosition, HexaPositions } from './hexa-positions';
import { Tile } from './tiles';
import { InstancedTileGroup } from './mesh/instanced/instanced-tile-group';

export class Map {
  static instance: Map;

  private size: {
    x: number;
    z: number;
  };

  private selectBox: InstancedTileGroup | null;

  private tiles: { position: MapPosition; tile: Tile }[];

  public static getInstance(): Map {
    if (!Map.instance) {
      Map.instance = new Map();
    }

    return Map.instance;
  }

  constructor() {
    this.size = {
      x: 100,
      z: 100,
    };

    this.tiles = [];
    this.selectBox = null;
  }

  setSelectBox(selectBox: InstancedTileGroup) {
    this.selectBox = selectBox;
  }

  seed() {
    for (let x = 0; x < this.size.x; x++) {
      for (let z = 0; z < this.size.z; z++) {
        const rand = Math.random();
        if (rand > 0.3 && rand < 0.7) {
          this.tiles.push({ position: { x, z }, tile: { type: 'grass' } });
          continue;
        }

        if (rand > 0.8) {
          this.tiles.push({ position: { x, z }, tile: { type: 'sea' } });
          continue;
        }

        this.tiles.push({ position: { x, z }, tile: { type: 'mountain' } });
      }
    }
  }

  selectTile(position: MapPosition) {
    if (!this.selectBox) return;
    const offsetMatrix = new HexaPositions([position]).getOffsetMatrixAt(0);

    const pos = new Vector3().setFromMatrixPosition(offsetMatrix);
    const mesh = this.selectBox.meshes[0];
    mesh.position.set(pos.x - 1, 0.01, pos.z);
  }

  getTileAt(position: MapPosition): Tile {
    const tile = this.tiles.find((t) => t.position.x === position.x && t.position.z === position.z);
    if (!tile) throw new Error('tile not found');

    return tile.tile;
  }

  getTilesPositionByType(type: Tile['type']): MapPosition[] {
    return this.tiles.filter((t) => t.tile.type === type).map((t) => t.position);
  }
}
