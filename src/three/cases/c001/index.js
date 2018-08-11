import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  MeshBasicMaterial,
  Geometry,
  Mesh,
  Face3,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.set(0, 0, 200);
  camera.lookAt(new Vector3(0, 0, 0));
  const scene = new Scene();

  const material = new MeshBasicMaterial({ color: 0xffff00 });
  const geometry = new Geometry();
  geometry.vertices.push(
    new Vector3(0, 50, 0),
    new Vector3(-50, 0, 0),
    new Vector3(50, 0, 0),
  );
  geometry.faces.push(new Face3(0, 1, 2));
  const line = new Mesh(geometry, material);
  scene.add(line);

  renderer.render(scene, camera);
}
