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
    const testChunk = new Chunk(this.chunkSize, this.chunkSize);
    const { dX, dY } = testChunk;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const offset = new Vector2(c * dX, r * dY);

        const chunk = new Chunk(this.chunkSize, this.chunkSize, offset);
        this.add(chunk);

        i += 1;
      }
    }
  }
}
