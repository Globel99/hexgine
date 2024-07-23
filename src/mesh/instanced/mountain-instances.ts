const D_X = 3.1;
const D_Y = 0.9;
const D_ROW = 1.5;

import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  InstancedMesh,
  Mesh,
  Matrix4,
  Group,
  MeshStandardMaterial,
  Material,
  Scene,
  InstancedBufferAttribute,
} from 'three';

const rows = 100;
const columns = 100;

export class MountainInstances {
  private meshes: Mesh[];
  readonly group: Group;
  readonly originalGroup: Group;

  constructor(gltfScene: Group, i: number) {
    //this.meshes = (gltfScene.children[0].children as Mesh[]).map((m) => m.clone());
    this.meshes = [
      gltfScene.children[0].children[0].clone(),
      gltfScene.children[0].children[1].clone(),
      gltfScene.children[0].children[2].clone(),
    ] as Mesh[];

    console.log('meshes length', this.meshes.length);
    this.originalGroup = new Group();
    this.group = new Group();

    const children = this.meshes.map((mesh) => {
      const count = rows * columns;
      const colors = new Float32Array(count * 3); // 3 values per instance (r, g, b)

      const material = mesh.material as MeshStandardMaterial;

      // Set the colors for each instance
      for (let i = 0; i < count; i++) {
        colors[i * 3] = material.color.r;
        colors[i * 3 + 1] = material.color.g;
        colors[i * 3 + 2] = material.color.b;
      }

      //material.wireframe = true;
      mesh.geometry.rotateY(17.98);

      const instancedMesh = new InstancedMesh(mesh.geometry, mesh.material, rows * columns);
      instancedMesh.instanceColor = new InstancedBufferAttribute(colors, 3);
      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;
      return instancedMesh;
    });

    this.group.add(children[i]);

    this.setPositions();

    console.log(this.group);

    this.originalGroup.add(...(gltfScene.children[0].children as Mesh[]));
  }

  private setPositions() {
    let i = 0;

    this.group.children.forEach((child) => {
      const instancedMesh = child as InstancedMesh;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const currentRowD = r % 2 ? D_ROW : 0;
          const x = c * D_X + currentRowD;
          const y = r * D_Y;

          const matrix = new Matrix4();
          matrix.setPosition(x, 0, y);

          instancedMesh.setMatrixAt(i, matrix);
          i += 1;
        }
      }

      instancedMesh.renderOrder = i;
      instancedMesh.updateMatrix();
      instancedMesh.visible = true;
      instancedMesh.receiveShadow = true;

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
    });
  }
}
