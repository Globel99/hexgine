import { Vector3, Triangle } from 'three';

export function subdivideTriangle(triangle: Triangle): Triangle[] {
  const v0 = triangle.a;
  const v1 = triangle.b;
  const v2 = triangle.c;

  const v01 = v0.clone().lerp(v1, 0.5);
  const v12 = v1.clone().lerp(v2, 0.5);
  const v20 = v2.clone().lerp(v0, 0.5);

  return [
    new Triangle(new Vector3(v0.x, v0.y, v0.z), new Vector3(v01.x, v01.y, v01.z), new Vector3(v20.x, v20.y, v20.z)),
    new Triangle(new Vector3(v01.x, v01.y, v01.z), new Vector3(v1.x, v1.y, v1.z), new Vector3(v12.x, v12.y, v12.z)),
    new Triangle(new Vector3(v12.x, v12.y, v12.z), new Vector3(v2.x, v2.y, v2.z), new Vector3(v20.x, v20.y, v20.z)),
    new Triangle(new Vector3(v01.x, v01.y, v01.z), new Vector3(v12.x, v12.y, v12.z), new Vector3(v20.x, v20.y, v20.z)),
  ];
}

export function makeVerticesFromTriangles(triangles: Triangle[]): Vector3[] {
  return triangles.map((t) => [t.a, t.b, t.c]).flat();
}

export function reverseFacing(triangles: Triangle[]): Triangle[] {
  return triangles.map((t) => new Triangle(t.c, t.b, t.a));
}
