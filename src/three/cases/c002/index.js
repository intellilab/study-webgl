import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  CubeGeometry,
  SphereGeometry,
  SpotLight,
} from 'three';

const WIDTH = 800;
const HEIGHT = 600;

export default function init(container) {
  const renderer = new WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.append(renderer.domElement);

  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.set(-60, 20, 40);

  const scene = new Scene();
  scene.position.set(0, 0, 0);
  camera.lookAt(scene.position);

  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  const axes = new AxesHelper(20);
  scene.add(axes);

  {
    const geometry = new PlaneGeometry(80, 20);
    const material = new MeshLambertMaterial({ color: 0xcccccc });
    const plane = new Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
  }

  {
    const geometry = new CubeGeometry(4, 4, 4);
    const material = new MeshLambertMaterial({ color: 0x00ffff });
    const cube = new Mesh(geometry, material);
    cube.position.set(-20, 2, 0);
    scene.add(cube);
  }

  {
    const geometry = new SphereGeometry(4);
    const material = new MeshLambertMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);
  }

  rotate();

  function rotate() {
    requestAnimationFrame(rotate);
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}
