import { initCanvas, initShaderProgram } from '../util';

const vsSource = `
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
void main() {
  gl_Position = u_xformMatrix * a_Position;
}
`;
const fsSource = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;
const TWICE_PI = 2 * Math.PI;

export default function init(container) {
  const { gl } = initCanvas(container, 600, 600);
  const program = initShaderProgram(gl, vsSource, fsSource);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  const uFragColor = gl.getUniformLocation(program, 'u_FragColor');
  const uXformMatrix = gl.getUniformLocation(program, 'u_xformMatrix');

  const vertices = new Float32Array([
    -0.5, 0.5, 0, 0, 0.5, 0.5,
  ]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.uniform4f(uFragColor, 1.0, 1.0, 0.0, 1.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  let rad = 0;
  const [tx, ty, tz] = [0.0, 0.25, 0.0];
  const [sx, sy, sz] = [0.5, 0.5, 0.5];
  draw();

  function draw() {
    requestAnimationFrame(draw);
    const cosB = Math.cos(rad);
    const sinB = Math.sin(rad);
    /**
     * 3. rotate
     * [
     *   cosB, sinB, 0, 0,
     *   -sinB, cosB, 0, 0,
     *   0, 0, 1, 0,
     *   0, 0, 0, 1,
     * ]
     * 2. translate
     * [
     *   1, 0, 0, 0,
     *   0, 1, 0, 0,
     *   0, 0, 1, 0,
     *   tx, ty, tz, 1,
     * ]
     * 1. scale
     * [
     *   sx, 0, 0, 0,
     *   0, sy, 0, 0,
     *   0, 0, sz, 0,
     *   0, 0, 0, 1,
     * ]
     */
    const xformMatrix = new Float32Array([
      sx * cosB, sx * sinB, 0.0, 0.0,
      sy * -sinB, sy * cosB, 0.0, 0.0,
      0.0, 0.0, sz, 0.0,
      tx * cosB - ty * sinB, tx * sinB + ty * cosB, tz, 1.0,
    ]);
    gl.uniformMatrix4fv(uXformMatrix, false, xformMatrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    rad += 0.01;
    if (rad >= TWICE_PI) rad = 0;
  }
}
