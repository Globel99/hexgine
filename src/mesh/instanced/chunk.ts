import { MeshStandardMaterial, Matrix4, Vector2, InstancedMesh, TextureLoader, InstancedBufferAttribute } from 'three';
import { Hexagon } from '../../geometry/hexagon';
import hexagonShader from '../../shader/hexagon-shader';

export default class Chunk extends InstancedMesh {
  rows: number;
  columns: number;
  hex: Hexagon;
  offset: Vector2;
  hexMap: Float32Array;

  constructor(rows: number, columns: number, offset: Vector2 = new Vector2(0, 0)) {
    const hexa = new Hexagon();

    const loader = new TextureLoader();
    const textureAtlas = loader.load('src/textures/water-grass.jpg');

    const material = new MeshStandardMaterial({
      map: textureAtlas,
      // @ts-ignore
      onBeforeCompile: hexagonShader,
    });
    const instanceCount = rows * columns;

    const MAX_INSTANCE_COUNT = 10000;
    super(hexa, material, Math.min(MAX_INSTANCE_COUNT, instanceCount));

    if (instanceCount > MAX_INSTANCE_COUNT) {
      console.error('instance count exceeds maximum value');
    }

    this.rows = rows;
    this.columns = columns;
    this.hex = hexa;
    this.offset = offset;
    this.hexMap = new Float32Array(this.rows * this.columns).fill(0).map((v, i) => Math.random() > 0.5);

    this.setHexMap();
    this.setMatrices();
  }

  private setMatrices() {
    let i = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const currentRowD = r % 2 ? this.hex.rowDistance : 0;
        const x = c * this.hex.dX + currentRowD;
        const y = r * this.hex.dY;

        const matrix = new Matrix4();
        matrix.setPosition(x + this.offset.x, 0, y + this.offset.y);

        this.setMatrixAt(i, matrix);
        i += 1;
      }
    }
  }

  private setHexMap() {
    this.hex.setAttribute('textureId', new InstancedBufferAttribute(this.hexMap, 1));
  }

  get dX(): number {
    return this.columns * this.hex.dX;
  }

  get dY(): number {
    return this.rows * this.hex.dY;
  }
}
