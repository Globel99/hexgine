import { Mesh, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export async function loadModel<T extends string>(...names: T[]): Promise<Record<T, Mesh[]>> {
  const objloader = new GLTFLoader();

  const gltfScenes = await Promise.all(names.map((name) => objloader.loadAsync('/' + name + '.glb')));

  console.log(gltfScenes);

  const returnValue: Record<T, Mesh[]> = {} as Record<T, Mesh[]>;

  names.forEach((name, index) => {
    const scene = gltfScenes[index].scene;
    const root = scene.children[0] as Group | Mesh;

    let meshes: Mesh[] = [];

    if ('isGroup' in root) {
      meshes = root.children as Mesh[];
    } else if ('isMesh' in root) {
      meshes = [root] as Mesh[];
    } else {
      throw new Error('could not resolve gltf scene');
    }

    returnValue[name] = meshes;

    console.log('model loaded', {
      name,
      meshNumber: meshes.length,
      meshes: meshes.map((m) => ({
        name: m.name,
        material: m.material,
      })),
    });
  });

  return returnValue;
}
