import { Group, MeshStandardMaterial, Mesh, Color } from 'three';
import { InstancedTileMesh } from './instanced-tile-mesh';
import { HexaPositions, MapPosition } from '../../hexa-positions';

export class InstancedTileGroup extends Group {
  hexaPositions: HexaPositions;
  meshes: InstancedTileMesh[];

  constructor(meshes: Mesh[], hexPositions: HexaPositions) {
    super();

    this.meshes = meshes.map(
      (mesh) => new InstancedTileMesh(mesh.geometry, mesh.material as MeshStandardMaterial, hexPositions),
    );

    this.hexaPositions = hexPositions;
    this.add(...this.meshes);
  }

  select(id: number) {
    //console.log('select', id);
    this.children.forEach((_child) => {
      const child = _child as InstancedTileMesh;

      child.setColorAt(id, new Color(0xff0000));
      //child.instanceColor.needsUpdate = true;
    });
  }

  getHexaPositionAt(index: number): MapPosition {
    return this.hexaPositions.positions[index];
  }
}
