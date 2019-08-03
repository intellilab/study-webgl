import {
  initCanvas,
  initShaderProgram,
  m4,
  getColor,
} from '../../util';
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
  const colorArray = [
    getColor(0),
    getColor(0),
    getColor(0),
    getColor(1),
    getColor(1),
    getColor(1),
    getColor(2),
    getColor(3),
    getColor(4),
    getColor(5),
    getColor(6),
    getColor(7),
    getColor(8),
    getColor(9),
    getColor(10),
    getColor(11),
  ]
  .reduce((res, item) => [
    ...res,
    ...Array.from({ length: 6 }, () => item),
  ], [])
  .reduce((res, item) => [
    ...res,
    ...item,
  ], []);
  const colorData = new Float32Array(colorArray);
  const FSIZE = vertexData.BYTES_PER_ELEMENT;

  const bufferVertex = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(aPosition);

  const bufferColor = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferColor);
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
  const aColor = gl.getAttribLocation(program, 'a_color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(aColor);

  const uMatrix = gl.getUniformLocation(program, 'u_matrix');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  let radX = 0.0;
  let radZ = 0.0;
  const TWICE_PI = 2 * Math.PI;
  const baseMatrix = [
    m4.perspective(Math.PI / 3, WIDTH / HEIGHT, 1, 2000),
    // m4.scaling(0.5, 0.5, 1.0),
    m4.translation(0, 0, -360),
  ].reduce(m4.multiply);
  draw();

  function draw() {
    requestAnimationFrame(draw);
    const matrix = [
      baseMatrix,
      m4.xRotation(radX),
      m4.zRotation(radZ),
      m4.translation(-50, -75, 0),
    ].reduce(m4.multiply);
    gl.uniformMatrix4fv(uMatrix, false, matrix);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 16);
    radX += 0.01;
    radZ += 0.003;
    if (radX > TWICE_PI) radX = 0;
    if (radZ > TWICE_PI) radZ = 0;
  }
}
