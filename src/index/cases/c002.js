import { initCanvas, initShaderProgram } from '../util';

const vsSource = `
attribute vec4 a_Position;
uniform float u_CosB;
uniform float u_SinB;
void main() {
  gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
  gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
  gl_Position.z = a_Position.z;
  gl_Position.w = 1.0;
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
  const uCosB = gl.getUniformLocation(program, 'u_CosB');
  const uSinB = gl.getUniformLocation(program, 'u_SinB');

  const vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
  ]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.uniform4f(uFragColor, 1.0, 1.0, 0.0, 1.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  let rad = 0;
  draw();

  function draw() {
    requestAnimationFrame(draw);
    gl.uniform1f(uCosB, Math.cos(rad));
    gl.uniform1f(uSinB, Math.sin(rad));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    rad += 0.01;
    if (rad >= TWICE_PI) rad = 0;
  }
}
