import {
  multiplyM,
  subtractV3,
  normalizeV3,
  crossV3,
  transformP,
} from './helper';

export function translation(tx, ty, tz) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1,
  ];
}

export function xRotation(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ];
}

export function yRotation(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ];
}

export function zRotation(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ];
}

export function scaling(sx, sy, sz) {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  ];
}

export function multiply(...matrices) {
  return matrices.reduce((res, mat) => multiplyM(res, mat, 4));
}

// DEPRECATED in favor of orthographic
// export function projection(width, height, depth) {
//   return [
//     2 / width, 0, 0, 0,
//     0, -2 / height, 0, 0,
//     0, 0, 2 / depth, 0,
//     -1, 1, 0, 1,
//   ];
// }

export function orthographic(left, right, bottom, top, near, far) {
  return [
    2 / (right - left), 0, 0, 0,
    0, 2 / (top - bottom), 0, 0,
    0, 0, 2 / (near - far), 0,
    (left + right) / (left - right),
    (bottom + top) / (bottom - top),
    (near + far) / (near - far),
    1,
  ];
}

export function perspective(fieldOfView, aspect, near, far) {
  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfView);
  const rangeInv = 1.0 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0,
  ];
}

export function lookAt(camera, target, up) {
  const zAxis = normalizeV3(subtractV3(camera, target));
  const xAxis = normalizeV3(crossV3(up, zAxis));
  const yAxis = normalizeV3(crossV3(zAxis, xAxis));
  return [
    ...xAxis, 0,
    ...yAxis, 0,
    ...zAxis, 0,
    ...camera, 1,
  ];
}

export function transform(...matrices) {
  const point = matrices.pop();
  return transformP(multiply(...matrices), point);
}
