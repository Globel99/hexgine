import { Group, MeshStandardMaterial, Mesh, Color } from 'three';
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

  select(id: number) {
    //console.log('select', id);
    this.children.forEach((_child) => {
      const child = _child as InstancedTileMesh;

      child.setColorAt(id, new Color(0xff0000));
      //child.instanceColor.needsUpdate = true;
    });
  }
}
