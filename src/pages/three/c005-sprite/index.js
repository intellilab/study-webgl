import {
  TextureLoader,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;

async function loadResources() {
  const data = {};
  data.kenny = await new Promise((resolve) => {
    const textureLoader = new TextureLoader();
    textureLoader.load('kenny.png', resolve);
  });
  return data;
}

export default async function init(container) {
  const data = await loadResources();
  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(60, WIDTH / HEIGHT, 1, 2000);
  camera.position.z = 1500;
  const scene = new Scene();
  const amount = 10;
  const radius = 400;
  for (let a = 0; a < amount; a += 1) {
    const theta = a / amount * 2 * Math.PI;
    const x = 0;
    const y = Math.cos(theta);
    const z = Math.sin(theta);
    const geometry = new PlaneBufferGeometry(100, 100);
    const material = new MeshBasicMaterial({ map: data.kenny, side: DoubleSide });
    material.transparent = true;
    const plane = new Mesh(geometry, material);
    plane.position.set(x, y, z);
    plane.position.normalize();
    plane.position.multiplyScalar(radius);
    plane.rotation.x = theta;
    scene.add(plane);
  }
  render();

  function render() {
    requestAnimationFrame(render);
    scene.rotation.x += 0.01;
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
}
