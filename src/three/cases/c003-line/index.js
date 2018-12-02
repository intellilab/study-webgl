import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Geometry,
  Vector3,
  Color,
  LineBasicMaterial,
  VertexColors,
  Line,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;
const N = 10;
const R = 50;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.set(0, 0, 200);
  camera.lookAt(new Vector3(0, 0, 0));
  const scene = new Scene();

  const points = Array.from({ length: N }, (_, i) => getPoint(
    R,
    i / N * Math.PI * 2,
    0,
  ));
  points.push(points[0]);
  const geometry = new Geometry();
  geometry.vertices.push(...points.map(point => new Vector3(...point)));
  geometry.colors.push(...points.map(getColor));
  const material = new LineBasicMaterial({
    linewidth: 1,
    vertexColors: VertexColors,
  });
  const line = new Line(geometry, material);
  scene.add(line);
  animate();

  function animate() {
    requestAnimationFrame(animate);
    line.rotation.x += 0.01;
    renderer.render(scene, camera);
  }
}

function getPoint(r, t, z) {
  return [
    r * Math.cos(t),
    r * Math.sin(t),
    z,
  ];
}

function getColor() {
  const color = new Color(0xffffff);
  color.setHSL(0.5 + Math.random() * 0.5, Math.random(), 0.8);
  return color;
}
