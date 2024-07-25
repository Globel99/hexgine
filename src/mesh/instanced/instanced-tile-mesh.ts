import { InstancedMesh, BufferGeometry, MeshStandardMaterial } from 'three';
import { HexaPositions } from '../../hexa-positions';

export class InstancedTileMesh extends InstancedMesh<BufferGeometry, MeshStandardMaterial> {
  hexaPositions: HexaPositions;

  constructor(geometry: BufferGeometry, material: MeshStandardMaterial, hexaPositions: HexaPositions) {
    super(geometry, material, hexaPositions.positions.length);

    this.hexaPositions = hexaPositions;

    this.setHexaPositions();
  }

  private setHexaPositions() {
    [...Array(this.count)].forEach((_, index) => {
      this.setMatrixAt(index, this.hexaPositions.getOffsetMatrixAt(index));
    });
  }
}
