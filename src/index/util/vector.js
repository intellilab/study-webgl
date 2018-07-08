export function normalizeV3([x, y, z]) {
  const len = Math.sqrt(x * x + y * y + z * z);
  return len > 0.00001 ? [x / len, y / len, z / len] : [0, 0, 0];
}

export function crossMultiply([x1, y1, z1], [x2, y2, z2]) {
  return [
    y1 * z2 - y2 * z1,
    z1 * x2 - z2 * x1,
    x1 * y2 - x2 * y1,
  ];
}
