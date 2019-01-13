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
  const sqrt3d3 = Math.sqrt(3) / 3;
  geometry.vertices.push(
    new Vector3(0, sqrt3d3 * 2, 0),
    new Vector3(-1, -sqrt3d3, 0),
    new Vector3(1, -sqrt3d3, 0),
  );
  geometry.faces.push(new Face3(0, 1, 2));
  const triangle = new Mesh(geometry, material);
  triangle.scale.multiplyScalar(30);
  scene.add(triangle);
  rotate();

  function rotate() {
    requestAnimationFrame(rotate);
    triangle.rotation.z += 0.01;
    renderer.render(scene, camera);
  }
}
