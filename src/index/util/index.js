import h from '@gera2ld/jsx-dom';

export * as matrix from './matrix';

export function initCanvas(container, width = 800, height = 600) {
  const canvas = <canvas width={width} height={height} />;
  container.append(canvas);
  const gl = canvas.getContext('webgl');
  return { canvas, gl };
}

export function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

export function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}
