// eslint-disable-next-line import/prefer-default-export
export function multiplyM(mat1, mat2, size) {
  const out = [];
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
