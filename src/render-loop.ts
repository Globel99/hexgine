import { Raycaster, Vector2 } from 'three';
import { scene, camera, renderer } from './base';
import Chunk from './mesh/instanced/chunk';
import Map from './group/map';

export default class {
  private raycaster: Raycaster;
  private pointer: Vector2;

  constructor() {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
  }

  onPointerMove(event: PointerEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1.02;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1.03;
  }

  animate() {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects<Chunk>(scene.children, true);
    let selectedId: number = 0;

    if (intersects.length) {
      const id = intersects[0].instanceId;
      const chunk = intersects[0].object;

      if (id) {
        selectedId = chunk.id;
        console.log(chunk.select(id));
      }
    }

    //@ts-ignore
    const children: Map[] = scene.children;

    children.forEach((child) => {
      if (child.isMap) {
        const map = child;

        map.children.forEach((chunk) => {
          if (chunk.id !== selectedId) {
            chunk.deselect();
          }
        });
      }
    });

    requestAnimationFrame(() => {
      this.animate();
    });
    renderer.render(scene, camera);
  }

  start() {
    this.animate();
  }
}
