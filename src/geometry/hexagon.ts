import { CylinderGeometry } from 'three';

export class Hexagon extends CylinderGeometry {
  constructor(height = 0.1): CylinderGeometry {
    super(1, 1, height, 6, 1);
  }
}
