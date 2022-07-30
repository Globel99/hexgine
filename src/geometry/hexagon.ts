import { CylinderGeometry } from 'three';

export class Hexagon extends CylinderGeometry {
  sideLength: number;
  triangleHeight: number;
  gap: number;

  constructor(height = 0.05) {
    super(1, 1, height, 6, 1);

    this.sideLength = 1;
    this.triangleHeight = Math.sqrt(3) / 2;
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
