import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  HemisphereLight,
  DirectionalLight,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const WIDTH = 800;
const HEIGHT = 600;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 100);
  camera.position.set(0, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));
  const scene = new Scene();

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 20, 20);
    scene.add(light);
    scene.add(light.target);
  }

  const loader = new GLTFLoader();
  loader.load('cup.gltf', gltf => {
    scene.add(gltf.scene);
    render();
  });

  function render() {
    // requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
