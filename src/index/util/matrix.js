import { normalizeV3, crossMultiply } from './vector';

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

export function multiply(mat1, mat2, size) {
  const out = create();
  for (let i = 0; i < size; i += 1) { // row
    for (let j = 0; j < size; j += 1) { // column
      let sum = 0;
      for (let k = 0; k < size; k += 1) {
        sum += mat1[i + size * k] * mat2[k + size * j];
      }
      out[i + size * j] = sum;
    }
  }
  return out;
}

export function translate(mat, tx = 0, ty = 0, tz = 0) {
  let r = create(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1,
  );
  if (mat) r = multiply(r, mat);
  return r;
}

export function rotate(mat, a, x = 0, y = 0, z = 1) {
  const d = Math.sqrt(x * x + y * y + z * z);
  const dx = x / d;
  const dy = y / d;
  const dz = z / d;
  const cosA = Math.cos(a);
  const t = 1 - cosA;
  const sinA = Math.sin(a);
  let r = create(
    cosA + dx * dx * t, dx * dy * t + dz * sinA, dx * dz * t - dy * sinA, 0,
    dx * dy * t - dz * sinA, cosA + dy * dy * t, dy * dz * t + dx * sinA, 0,
    dx * dz * t + dy * sinA, dy * dz * t - dx * sinA, cosA + dz * dz * t, 0,
    0, 0, 0, 1,
  );
  if (mat) r = multiply(r, mat);
  return r;
}

export function scale(mat, sx = 1, sy = 1, sz = 1) {
  let r = create(
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  );
  if (mat) r = multiply(r, mat);
  return r;
}

export function lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  const N = normalizeV3([centerX - eyeX, centerY - eyeY, centerZ - eyeZ]);
  const U = normalizeV3(crossMultiply(N, [upX, upY, upZ]));
  const V = crossMultiply(U, N);
  const r = create(
    U[0], V[0], -N[0], 0,
    U[1], V[1], -N[1], 0,
    U[2], V[2], -N[2], 0,
    0, 0, 0, 1,
  );
  return multiply(r, translate(null, -eyeX, -eyeY, -eyeZ));
}

export class Matrix {
  constructor(data) {
    if (data instanceof Matrix) {
      this.value = data.value;
    } else if (Array.isArray(data)) {
      this.value = create(...data);
    } else {
      this.value = create();
    }
  }

  translate(tx, ty, tz) {
    this.value = translate(this.value, tx, ty, tz);
    return this;
  }

  rotate(a, x, y, z) {
    this.value = rotate(this.value, a, x, y, z);
    return this;
  }

  scale(sx, sy, sz) {
    this.value = scale(this.value, sx, sy, sz);
    return this;
  }
}
