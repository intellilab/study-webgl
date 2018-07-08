import { initCanvas, initShaderProgram, m3 } from '../../util';
import vsSource from './index.vert';
import fsSource from './index.frag';

export default function init(container) {
  const { gl } = initCanvas(container, 600, 600);
  const program = initShaderProgram(gl, vsSource, fsSource);

  const bufferData = new Float32Array([
    0, 0,
    30, 0,
    0, 150,
    0, 150,
    30, 0,
    30, 150,

    30, 0,
    100, 0,
    30, 30,
    30, 30,
    100, 0,
    100, 30,

    30, 60,
    67, 60,
    30, 90,
    30, 90,
    67, 60,
    67, 90,
  ]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
  const FSIZE = bufferData.BYTES_PER_ELEMENT;

  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 2, 0);
  gl.enableVertexAttribArray(aPosition);

  const uMatrix = gl.getUniformLocation(program, 'u_matrix');
  const matrix = [
    m3.projection(300, 300),
    m3.translation(100, 100),
    m3.rotation(Math.PI / 6),
    m3.scaling(0.5, 0.5),
  ].reduce(m3.multiply);
  gl.uniformMatrix3fv(uMatrix, false, matrix);

  const uColor = gl.getUniformLocation(program, 'u_color');
  gl.uniform4fv(uColor, [Math.random(), Math.random(), Math.random(), 1]);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 18);
}
