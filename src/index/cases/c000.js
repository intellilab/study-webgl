import h from '@gera2ld/jsx-dom';
import { initCanvas, initShaderProgram } from '../util';

const WIDTH = 600;
const HEIGHT = 600;
const HWIDTH = WIDTH / 2;
const HHEIGHT = HEIGHT / 2;
const vsSource = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}
`;
const fsSource = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;
const points = [];
const colors = [];

export default function init(container) {
  const { canvas, gl } = initCanvas(container, WIDTH, HEIGHT);
  const program = initShaderProgram(gl, vsSource, fsSource);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  const aPointSize = gl.getAttribLocation(program, 'a_PointSize');
  const uFragColor = gl.getUniformLocation(program, 'u_FragColor');
  gl.vertexAttrib1f(aPointSize, 20.0);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  const context = { gl, aPosition, uFragColor };
  canvas.addEventListener('click', e => handleClick(e, context), false);
  draw(context);
  container.append(<p className="text-center">Click on the canvas</p>);
}

function handleClick(e, context) {
  const { clientX, clientY, target } = e;
  const rect = target.getBoundingClientRect();
  const x = ((clientX - rect.left) - HWIDTH) / HWIDTH;
  const y = (HHEIGHT - (clientY - rect.top)) / HHEIGHT;
  points.push([x, y]);
  colors.push([rand(0.5, 1), rand(0.5, 1), rand(0.5, 1)]);
  draw(context);
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function draw({ gl, aPosition, uFragColor }) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  points.forEach((point, index) => {
    const color = colors[index];
    gl.vertexAttrib3f(aPosition, ...point, 0.0);
    gl.uniform4f(uFragColor, ...color, 1.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  });
}
