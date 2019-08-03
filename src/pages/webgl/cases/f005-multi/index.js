import {
  initCanvas,
  createProgram,
  createAttributeSetters,
  createUniformSetters,
  setValues,
  createBuffer,
  m4,
  helper,
  random,
} from '../../util';
import vsSource from './index.vert';
import fsSource from './index.frag';

const WIDTH = 600;
const HEIGHT = 600;

export default function init(container) {
  const { gl } = initCanvas(container, WIDTH, HEIGHT);
  const program = createProgram(gl, [vsSource, fsSource]);
  const data = {
    position: {
      numComponents: 3,
      data: [
        -10, -10, 0,
        10, -10, 0,
        -10, 10, 0,
        10, 10, 0,
      ],
    },
    normal: {
      numComponents: 3,
      data: [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
      ],
    },
  };
  const attribs = Object.entries(data)
  .reduce((map, [key, value]) => ({
    ...map,
    [`a_${key}`]: {
      buffer: createBuffer(gl, new Float32Array(value.data)),
      numComponents: value.numComponents,
    },
  }), {});
  const attribSetters = createAttributeSetters(gl, program);
  const uniformSetters = createUniformSetters(gl, program);
  setValues(attribSetters, attribs);

  const camera = [0, 0, 200];
  const target = [0, 0, 0];
  const up = [0, 1, 0];
  const cameraMatrix = m4.lookAt(camera, target, up);
  const baseMatrix = [
    m4.perspective(Math.PI / 3, WIDTH / HEIGHT, 1, 2000),
    helper.inverse(cameraMatrix, 4),
  ].reduce(m4.multiply);

  const TWICE_PI = 2 * Math.PI;
  const items = Array.from({ length: 10 }, () => ({
    color: [random(1, 0.3), random(1, 0.9), random(1, 0.2), 1],
    radX: random(TWICE_PI),
    radY: random(TWICE_PI),
    radius: random(90, 20),
    stepX: random(0.05, 0.005),
    stepY: random(0.05, 0.005),
  }));

  setValues(uniformSetters, {
    u_reverseLightDirection: helper.normalizeV3([0.5, 0.7, 1]),
  });
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  draw();

  function draw() {
    requestAnimationFrame(draw);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    items.forEach((item) => {
      const worldMatrix = [
        m4.xRotation(item.radX),
        m4.yRotation(item.radY),
        m4.translation(0, 0, item.radius),
      ].reduce(m4.multiply);
      const matrix = [
        baseMatrix,
        worldMatrix,
      ].reduce(m4.multiply);
      setValues(uniformSetters, {
        u_color: item.color,
        u_world: worldMatrix,
        u_worldViewProjection: matrix,
      });
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      item.radX += item.stepX;
      item.radY += item.stepY;
    });
  }
}
