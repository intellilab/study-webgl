import {
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  Scene,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;
const N = 10000;
const R = 100;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.set(0, 0, 200);
  camera.lookAt(new Vector3(0, 0, 0));
  const scene = new Scene();

  const vertices = [];
  for (let i = 0; i < N; i += 1) {
    const x = Math.random() * 2 * R - R;
    const y = Math.random() * 2 * R - R;
    const z = Math.random() * 2 * R - R;
    vertices.push(x, y, z);
  }
  const geometry = new BufferGeometry();
  geometry.addAttribute('position', new Float32BufferAttribute(vertices, 3));

  const material = new PointsMaterial();
  const points = new Points(geometry, material);
  scene.add(points);
  animate();

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}
