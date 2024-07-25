import { Triangle } from 'three';

export function makeVerticesFromTriangles(triangles: Triangle[]): Float32Array {
  const vertices = triangles.map((t) => [t.a, t.b, t.c]).flat();

  const flatVertices = vertices.map((v) => [v.x, v.y, v.z]).flat();

  return new Float32Array(flatVertices);
}
