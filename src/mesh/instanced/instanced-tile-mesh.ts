import { InstancedMesh, BufferGeometry, MeshStandardMaterial, InstancedBufferAttribute } from 'three';
import { HexaPositions } from '../../hexa-positions';

export class InstancedTileMesh extends InstancedMesh {
  hexaPositions: HexaPositions;
  standardMaterial: MeshStandardMaterial;

  constructor(geometry: BufferGeometry, material: MeshStandardMaterial, hexaPositions: HexaPositions) {
    super(geometry, material, hexaPositions.positions.length);

    this.standardMaterial = material;
    this.hexaPositions = hexaPositions;

    this.instanceColor = this.colorBuffer;
    this.setHexaPositions();
    //this.receiveShadow = true;
    //this.castShadow = true;
  }

  private get colorBuffer(): InstancedBufferAttribute {
    const { color } = this.standardMaterial;

    const colors = [...Array(this.count)].map(() => color.toArray()).flat();

    return new InstancedBufferAttribute(new Float32Array(colors), 3);
  }

  private setHexaPositions() {
    [...Array(this.count)].forEach((_, index) => {
      this.setMatrixAt(index, this.hexaPositions.getOffsetMatrixAt(index));
    });
  }
}
