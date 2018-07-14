export function memoize(func, resolver) {
  const cache = {};
  return function memoized(...args) {
    const key = resolver ? resolver(...args) : `${args[0]}`;
    let cached = cache[key];
    if (!cached) {
      cached = {
        value: func.apply(this, args),
      };
      cache[key] = cached;
    }
    return cached.value;
  };
}

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

export function subtractV(vec1, vec2) {
  const out = [];
  for (let i = 0; i < vec1.length; i += 1) {
    out[i] = vec1[i] - vec2[i];
  }
  return out;
}

export function normalizeV(vec) {
  const [x, y, z] = vec;
  const len = Math.sqrt(x * x + y * y + z * z);
  return len > 0.00001 ? [x / len, y / len, z / len] : [0, 0, 0];
}

export function crossV(vec1, vec2) {
  const [x1, y1, z1] = vec1;
  const [x2, y2, z2] = vec2;
  return [
    y1 * z2 - z1 * y2,
    z1 * x2 - x1 * z2,
    x1 * y2 - y1 * x2,
  ];
}

export function triangular(mat, size) {
  const out = [...mat];
  for (let i = size - 1; i >= 0; i -= 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      const v0 = out[i * size + i];
      if (!v0) return null;
      const v = out[i * size + j];
      if (v) {
        const x = -v / v0;
        for (let k = 0; k < size; k += 1) {
          out[k * size + j] += x * out[k * size + i];
        }
      }
    }
  }
  return out;
}

export function determinant(mat, size) {
  if (size === 1) return mat[0];
  if (size === 2) return mat[0] * mat[3] - mat[1] * mat[2];
  const tri = triangular(mat, size);
  if (!tri) return 0;
  let det = 1;
  for (let i = 0; i < size; i += 1) {
    det *= tri[i * size + i];
  }
  return det;
}

export function minorMatrix(mat, size, ei, ej) {
  const out = [];
  for (let i = 0; i < size; i += 1) {
    if (i !== ei) {
      for (let j = 0; j < size; j += 1) {
        if (j !== ej) {
          out.push(mat[i * size + j]);
        }
      }
    }
  }
  return out;
}

export function cofactors(mat, size) {
  const out = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      let value = determinant(minorMatrix(mat, size, i, j), size - 1);
      if ((i + j) % 2) value = -value;
      out[i * size + j] = value;
    }
  }
  return out;
}

export function transpose(mat, size) {
  const out = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      out[i * size + j] = mat[j * size + i];
    }
  }
  return out;
}

/**
 * Reference: https://www.mathsisfun.com/algebra/matrix-inverse-minors-cofactors-adjugate.html
 */
export function inverse(mat, size) {
  const det = determinant(mat, size);
  if (!det) return null;
  const cof = cofactors(mat, size);
  const transposed = transpose(cof, size);
  const detInv = 1 / det;
  const out = [];
  for (let i = 0; i < transposed.length; i += 1) {
    out[i] = transposed[i] * detInv;
  }
  return out;
}

export function reprMatrix(mat, size) {
  return Array.from(
    { length: size },
    (_1, j) => Array.from(
      { length: size },
      (_2, i) => mat[i * size + j],
    ).join('\t'),
  ).join('\n');
}

export function identity(size) {
  const out = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      out.push(i === j ? 1 : 0);
    }
  }
  return out;
}
