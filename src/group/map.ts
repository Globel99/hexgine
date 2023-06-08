import { Group, Vector2 } from 'three';
import Chunk from '../mesh/instanced/chunk';

export default class Map extends Group {
  rows: number;
  columns: number;
  chunkSize: number;

  constructor(rows: number, columns: number, chunkSize: number) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.chunkSize = chunkSize;

    this.setChunks();
  }

  private setChunks() {
    let i = 0;

    const hexmap = [
      [1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 1, 0, 0, 1],
      [0, 1, 0, 1, 0],
    ];

    const { dX, dY } = new Chunk(this.chunkSize, this.chunkSize, new Vector2(0, 0), hexmap);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const halfHexa = Math.sqrt(3) / 2;
        const rowOffset = r % 2 ? halfHexa : 0;

        const offset = new Vector2(c * dX + rowOffset, r * dY);

        const chunk = new Chunk(this.chunkSize, this.chunkSize, offset, hexmap);
        this.add(chunk);

        i += 1;
      }
    }
  }
}
