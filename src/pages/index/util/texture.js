import h from '@gera2ld/jsx-dom';

const canvas = <canvas />;
const ctx = canvas.getContext('2d');

export function createTexture(gl) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  return tex;
}

export function createStripeTexture(gl, {
  width = 2,
  height = 2,
  color1,
  color2,
} = {}) {
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = color1 || 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color2 || 'black';
  ctx.fillRect(0, 0, width, height / 2);
  return createTexture(gl);
}
