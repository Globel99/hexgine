import { camera, renderer, scene } from './base';

// @ts-ignore
import { createInspector } from 'three-inspect/vanilla';

const targetElement = document.querySelector('div');

if (targetElement) {
  createInspector(targetElement, {
    scene,
    camera,
    renderer,
  });
}
