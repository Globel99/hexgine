import { Triangle, Vector3, Vector2 } from 'three';
import { subdivideTriangle, makeVerticesFromTriangles, reverseFacing } from '../../utils/triangle';

export function getHexagonVertices(radius: number = 1): Float32Array {
  const basePoints: Vector2[] = [];

  // 6 Points of Hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i / 3) * Math.PI;
    basePoints.push(new Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius));
  }

  const topTriangles: Triangle[] = [];
  const bottomTriangles: Triangle[] = [];

  const topY = 0.5;
  const bottomY = 0;

  for (let i = 0; i < 6; i++) {
    const baseP = basePoints[i];
    const nextBaseP = basePoints[(i + 1) % 6];
    topTriangles.push(
      new Triangle(
        new Vector3(baseP.x, topY, baseP.y),
        new Vector3(0, topY, 0),
        new Vector3(nextBaseP.x, topY, nextBaseP.y),
      ),
    );
    //
    // reversed
    bottomTriangles.push(
      new Triangle(
        new Vector3(baseP.x, bottomY, baseP.y),
        new Vector3(0, bottomY, 0),
        new Vector3(nextBaseP.x, bottomY, nextBaseP.y),
      ),
    );
  }

  console.log(topTriangles);

  const vertices = makeVerticesFromTriangles([
    //...topTriangles.map(subdivideTriangle).flat(),
    ...bottomTriangles.map(subdivideTriangle).flat(),
  ]);

  const modifiedVertices = changeCenterPointHeight(vertices, 1);
  console.log(modifiedVertices);

  return new Float32Array(modifiedVertices.map((v) => [v.x, v.y, v.z]).flat());
}

function changeCenterPointHeight(hexagonVertices: Vector3[], changeTo: number): Vector3[] {
  console.log(hexagonVertices);
  return hexagonVertices.map((v) => {
    const isCenter = v.x === 0 && v.z === 0 && v.y === 0.5;
    console.log(isCenter);

    if (isCenter) return new Vector3(v.x, changeTo, v.z);

    return v;
  });
}
