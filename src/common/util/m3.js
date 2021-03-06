import { multiplyM, transformP } from './helper';

export function identity() {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ];
}

export function translation(tx, ty) {
  return [
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1,
  ];
}

export function rotation(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    c, -s, 0,
    s, c, 0,
    0, 0, 1,
  ];
}

export function scaling(sx, sy) {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ];
}

export function multiply(...matrices) {
  return matrices.reduce((res, mat) => multiplyM(res, mat, 3));
}

export function projection(width, height) {
  return [
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1,
  ];
}

export function transform(...matrices) {
  const point = matrices.pop();
  return transformP(multiply(...matrices), point);
}
