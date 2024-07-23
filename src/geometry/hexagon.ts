import { BufferGeometry, BufferAttribute } from 'three';
import { getHexagonVertices } from './vertices/hexagon-vertices';

export class Hexagon extends BufferGeometry {
  sideLength: number;
  triangleHeight: number;
  gap: number;

  constructor() {
    super();

    this.setAttribute('position', new BufferAttribute(getHexagonVertices(), 3));
    this.computeVertexNormals();

    this.sideLength = 0.5;
    this.triangleHeight = 1.5;
    this.gap = 0.1;
  }

  get rowDistance(): number {
    return this.triangleHeight + this.gap / 2;
  }

  get dX(): number {
    return 2 * this.triangleHeight + this.gap;
  }

  get dY(): number {
    return (3 * this.sideLength) / 2 + this.gap * this.triangleHeight;
  }
}
