import {
  Scene,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  AmbientLight,
  SpotLight,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
  camera.position.set(0, 30, 80);

  const scene = new Scene();
  scene.position.set(0, 0, 0);
  camera.lookAt(scene.position);

  const light = new AmbientLight(0x404040);
  scene.add(light);

  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(20, 20, 60);
  scene.add(spotLight);

  const group = new Group();
  scene.add(group);

  const axes = new AxesHelper(20);
  group.add(axes);

  {
    const geometry = new PlaneGeometry(80, 40);
    const material = new MeshLambertMaterial({ color: 0xcccccc });
    const plane = new Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    group.add(plane);
  }

  {
    const geometry = new BoxGeometry(8, 8, 8);
    const material = new MeshLambertMaterial({ color: 0x00ffff });
    const cube = new Mesh(geometry, material);
    cube.position.set(-20, 2, 0);
    group.add(cube);
  }

  {
    const geometry = new SphereGeometry(4);
    const material = new MeshLambertMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(20, 4, 0);
    group.add(sphere);
  }

  rotate();

  function rotate() {
    requestAnimationFrame(rotate);
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}
