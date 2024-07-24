import { Group, MeshStandardMaterial, Mesh } from 'three';
import { InstancedTileMesh } from './instanced-tile-mesh';
import { HexaPositions } from '../../hexa-positions';

export class InstancedTileGroup extends Group {
  constructor(meshes: Mesh[], hexPositions: HexaPositions) {
    super();

    this.add(
      ...meshes.map(
        (mesh) => new InstancedTileMesh(mesh.geometry, mesh.material as MeshStandardMaterial, hexPositions),
      ),
    );
  }
}
