import {
  initCanvas,
  initShaderProgram,
  m4,
  helper,
} from '#/common/util';
import vsSource from './index.vert';
import fsSource from './index.frag';

const WIDTH = 600;
const HEIGHT = 600;

export default function init(container) {
  const { gl } = initCanvas(container, WIDTH, HEIGHT);
  const program = initShaderProgram(gl, vsSource, fsSource);

  const vertexData = new Float32Array([
    0,    0,    0,
    0,    150,  0,
    30,   0,    0,
    0,    150,  0,
    30,   150,  0,
    30,   0,    0,

    30,   0,    0,
    30,   30,   0,
    100,  0,    0,
    30,   30,   0,
    100,  30,   0,
    100,  0,    0,

    30,   60,   0,
    30,   90,   0,
    67,   60,   0,
    30,   90,   0,
    67,   90,   0,
    67,   60,   0,

    0,    0,    30,
    30,   0,    30,
    0,    150,  30,
    0,    150,  30,
    30,   0,    30,
    30,   150,  30,

    30,   0,    30,
    100,  0,    30,
    30,   30,   30,
    30,   30,   30,
    100,  0,    30,
    100,  30,   30,

    30,   60,   30,
    67,   60,   30,
    30,   90,   30,
    30,   90,   30,
    67,   60,   30,
    67,   90,   30,

    0,    0,    0,
    100,  0,    0,
    100,  0,    30,
    0,    0,    0,
    100,  0,    30,
    0,    0,    30,

    0,    0,    0,
    0,    0,    30,
    0,    150,  30,
    0,    0,    0,
    0,    150,  30,
    0,    150,  0,

    100,  0,    0,
    100,  30,   0,
    100,  30,   30,
    100,  0,    0,
    100,  30,   30,
    100,  0,    30,

    67,   60,   0,
    67,   90,   0,
    67,   90,   30,
    67,   60,   0,
    67,   90,   30,
    67,   60,   30,

    30,   30,   0,
    30,   30,   30,
    100,  30,   0,
    30,   30,   30,
    100,  30,   30,
    100,  30,   0,

    30,   30,   0,
    30,   60,   0,
    30,   30,   30,
    30,   60,   0,
    30,   60,   30,
    30,   30,   30,

    30,   60,   0,
    67,   60,   0,
    30,   60,   30,
    30,   60,   30,
    67,   60,   0,
    67,   60,   30,

    30,   90,   0,
    30,   90,   30,
    67,   90,   0,
    30,   90,   30,
    67,   90,   30,
    67,   90,   0,

    30,   90,   0,
    30,   150,  0,
    30,   150,  30,
    30,   90,   0,
    30,   150,  30,
    30,   90,   30,

    0,    150,  0,
    0,    150,  30,
    30,   150,  30,
    0,    150,  0,
    30,   150,  30,
    30,   150,  0,
  ]);
  const getPoint = i => Array.from(
    { length: 3 },
    (_, j) => vertexData[i + j],
  );
  const getPoints = (i, n) => Array.from(
    { length: n },
    (_1, j) => getPoint(i + 3 * j),
  );
  const baseTransform = [
    m4.xRotation(Math.PI),
    m4.translation(-50, -75, 0),
  ].reduce(m4.multiply);
  for (let i = 0; i < vertexData.length; i += 3) {
    const point = getPoint(i);
    const transformed = helper.transformP(baseTransform, point);
    for (let j = 0; j < 3; j += 1) vertexData[i + j] = transformed[j];
  }
  const normals = [];
  for (let i = 0; i < vertexData.length; i += 6 * 3) {
    for (let j = 0; j < 2; j += 1) {
      const points = getPoints(i + 3 * 3 * j, 3);
      const v1 = helper.subtractV3(points[1], points[0]);
      const v2 = helper.subtractV3(points[2], points[1]);
      const normal = helper.normalizeV3(helper.crossV3(v1, v2));
      for (let k = 0; k < 3; k += 1) normals.push(...normal);
    }
  }
  const normalData = new Float32Array(normals);
  const FSIZE = vertexData.BYTES_PER_ELEMENT;

  const bufferVertex = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(aPosition);

  const bufferNormal = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferNormal);
  gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
  const aNormal = gl.getAttribLocation(program, 'a_normal');
  gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(aNormal);

  const uColor = gl.getUniformLocation(program, 'u_color');
  gl.uniform4fv(uColor, [0.2, 1, 0.2, 1]);

  const uWorldViewProjection = gl.getUniformLocation(program, 'u_worldViewProjection');
  const uWorld = gl.getUniformLocation(program, 'u_world');

  const uReverseLightDirection = gl.getUniformLocation(program, 'u_reverseLightDirection');
  gl.uniform3fv(uReverseLightDirection, helper.normalizeV3([0.5, 0.7, 1]));

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  let radY = 0.0;
  const TWICE_PI = 2 * Math.PI;
  const camera = [100, 150, 200];
  const target = [0, 35, 0];
  const up = [0, 1, 0];
  const cameraMatrix = m4.lookAt(camera, target, up);
  const baseMatrix = [
    m4.perspective(Math.PI / 3, WIDTH / HEIGHT, 1, 2000),
    helper.inverse(cameraMatrix, 4),
  ].reduce(m4.multiply);
  draw();

  function draw() {
    requestAnimationFrame(draw);
    const worldMatrix = [
      m4.yRotation(radY),
    ].reduce(m4.multiply);
    const matrix = [
      baseMatrix,
      worldMatrix,
    ].reduce(m4.multiply);
    gl.uniformMatrix4fv(uWorldViewProjection, false, matrix);
    gl.uniformMatrix4fv(uWorld, false, worldMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 16);
    radY += 0.01;
    if (radY > TWICE_PI) radY = 0;
  }
}
