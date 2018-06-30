const SIZE = 4;
const TOTAL = 16;

const hasFloat32Array = typeof Float32Array !== 'undefined';

export function create(...data) {
  const values = data.length ? data : [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ];
  if (values.length !== TOTAL) {
    throw new Error('Invalid params!');
  }
  return hasFloat32Array ? new Float32Array(values) : values;
}

export function clone(a) {
  return hasFloat32Array ? new Float32Array(a) : [...a];
}

export function add(mat1, mat2) {
  const out = clone(mat1);
  for (let i = 0; i < TOTAL; i += 1) {
    out[i] += mat2[i];
  }
  return out;
}

export function multiply(mat1, mat2) {
  const out = create();
  for (let i = 0; i < SIZE; i += 1) { // row
    for (let j = 0; j < SIZE; j += 1) { // column
      let sum = 0;
      for (let k = 0; k < SIZE; k += 1) {
        sum += mat1[i + SIZE * k] * mat2[k + SIZE * j];
      }
      out[i + SIZE * j] = sum;
    }
  }
  return out;
}

export function translate(mat, tx = 0, ty = 0, tz = 0) {
  return multiply([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1,
  ], mat);
}

export function rotate(mat, a, x = 0, y = 0, z = 1) {
  const d = Math.sqrt(x * x + y * y + z * z);
  const dx = x / d;
  const dy = y / d;
  const dz = z / d;
  const cosA = Math.cos(a);
  const t = 1 - cosA;
  const sinA = Math.sin(a);
  return multiply([
    cosA + dx * dx * t, dx * dy * t + dz * sinA, dx * dz * t - dy * sinA, 0,
    dx * dy * t - dz * sinA, cosA + dy * dy * t, dy * dz * t + dx * sinA, 0,
    dx * dz * t + dy * sinA, dy * dz * t - dx * sinA, cosA + dz * dz * t, 0,
    0, 0, 0, 1,
  ], mat);
}

export function scale(mat, sx = 1, sy = 1, sz = 1) {
  return multiply([
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  ], mat);
}
