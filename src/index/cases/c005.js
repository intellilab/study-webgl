import { initCanvas, initShaderProgram } from '../util';

const vsSource = `
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
  gl_Position = a_Position;
  v_Color = a_Color;
}
`;
const fsSource = `
precision mediump float;
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}
`;

export default function init(container) {
  const { gl } = initCanvas(container, 600, 600);
  const program = initShaderProgram(gl, vsSource, fsSource);

  const bufferData = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0,
  ]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
  const fSize = bufferData.BYTES_PER_ELEMENT;
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, fSize * 5, 0);
  gl.enableVertexAttribArray(aPosition);
  const aColor = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, fSize * 5, fSize * 2);
  gl.enableVertexAttribArray(aColor);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
