import { Matrix4 } from 'three';

type Position = {
  x: number;
  z: number;
};

const GAP = 0.1;
const X_DISTANCE = Math.sqrt(3) + GAP;
const Z_DISTANCE = 3 / 2 + GAP;

const ROW_OFFSET = Math.sqrt(3) / 2 + GAP / 2;

export class HexaPositions {
  positions: Position[];

  constructor(positions: Position[]) {
    this.positions = positions;
  }

  private calculateOffset(position: Position): {
    x: number;
    z: number;
  } {
    const offsetX = position.z % 2 === 0 ? ROW_OFFSET : 0;

    return {
      x: position.x * X_DISTANCE + offsetX,
      z: position.z * Z_DISTANCE,
    };
  }

  getOffsetMatrixAt(index: number): Matrix4 {
    const matrix = new Matrix4();

    const { x, z } = this.calculateOffset(this.positions[index]);

    return matrix.setPosition(x, 0, z);
  }
}
