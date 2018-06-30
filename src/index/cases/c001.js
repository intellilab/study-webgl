import { initCanvas, initShaderProgram } from '../util';

const vsSource = `
attribute vec4 a_Position;
void main() {
  gl_Position = a_Position;
}
`;
const fsSource = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;

export default function init(container) {
  const { gl } = initCanvas(container, 600, 600);
  const program = initShaderProgram(gl, vsSource, fsSource);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  const uFragColor = gl.getUniformLocation(program, 'u_FragColor');

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
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
