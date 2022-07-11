import { InstancedMesh, MeshBasicMaterial, Matrix4, Color } from 'three';
import { Hexagon } from './geometry/hexagon';

export default class Chunk extends InstancedMesh {
  rows: number;
  columns: number;
  xD: number;
  yD: number;
  rowD: number;

  constructor(rows: number, columns: number) {
    const hexa = new Hexagon(0.5);
    const material = new MeshBasicMaterial({});
    const instanceCount = rows * columns;

    const MAX_INSTANCE_COUNT = 10000;
    super(hexa, material, Math.min(MAX_INSTANCE_COUNT, instanceCount));

    if (instanceCount > MAX_INSTANCE_COUNT) {
      console.error('instance count exceeds maximum value');
    }

    this.rows = rows;
    this.columns = columns;

    this.xD = 2 * hexa.triangleHeight + hexa.gap;
    this.yD = (3 * hexa.sideLength) / 2 + hexa.gap * hexa.triangleHeight;
    this.rowD = hexa.rowDistance;

    this.setMatrices();
  }

  private setMatrices() {
    let i = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const currentRowD = r % 2 ? this.rowD : 0;
        const x = c * this.xD + currentRowD;
        const y = r * this.yD;

        console.log({ x, y });

        const matrix = new Matrix4();
        matrix.setPosition(x, i % 5 ? 1 : 1.5, y);

        this.setMatrixAt(i, matrix);

        this.setColorAt(i, new Color(0.6, 0.2, 0.2));

        i += 1;
      }
    }
  }
}
