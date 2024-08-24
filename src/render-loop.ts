import { Raycaster, Vector2 } from 'three';
import { scene, camera, renderer } from './base';
import { InstancedTileGroup } from './mesh/instanced/instanced-tile-group';

export default class {
  private raycaster: Raycaster;
  private pointer: Vector2;

  constructor() {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
  }

  onPointerMove(event: PointerEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);

    if (intersects.length) {
      const id = intersects[0].instanceId;

      if (id) {
        const parent = intersects[0].object.parent;
        if (parent && parent instanceof InstancedTileGroup) {
          const position = parent.getHexaPositionAt(id);

          if ('map' in window) {
            console.log('select');
            window.map.selectTile(position);
          }
        }
      }
    }

    requestAnimationFrame(() => {
      this.animate();
    });
    renderer.render(scene, camera);
  }

  start() {
    this.animate();
  }
}
