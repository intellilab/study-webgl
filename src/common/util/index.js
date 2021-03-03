import * as React from '@gera2ld/jsx-dom';
import { memoize } from './helper';

export * as matrix from './matrix';
export * as m3 from './m3';
export * as m4 from './m4';
export * as helper from './helper';
export * as texture from './texture';

export function initCanvas(container, width = 800, height = 600) {
  const canvas = <canvas width={width} height={height} />;
  container.append(canvas);
  const gl = canvas.getContext('webgl');
  return { canvas, gl };
}

export function initShaderProgram(gl, vsSource, fsSource) {
  return createProgram(gl, [vsSource, fsSource]);
}

export function createProgram(gl, [vsSource, fsSource]) {
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

export function random(max = 1, min = 0) {
  return min + Math.random() * (max - min);
}

export const getColor = memoize(() => [random(), random(), random()]);

export function createAttributeSetters(gl, program) {
  const attribSetters = {};
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < numAttribs; i += 1) {
    const attribInfo = gl.getActiveAttrib(program, i);
    attribSetters[attribInfo.name] = createAttribSetter(gl, program, attribInfo);
  }
  return attribSetters;
}

function createAttribSetter(gl, program, attribInfo) {
  const index = gl.getAttribLocation(program, attribInfo.name);
  return ({
    buffer, numComponents, type, normalize, stride, offset,
  }) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(
      index,
      numComponents,
      type || gl.FLOAT,
      normalize || false,
      stride || 0,
      offset || 0,
    );
  };
}

export function setValues(setters, info) {
  Object.entries(info).forEach(([key, value]) => {
    const setter = setters[key];
    if (setter) setter(value);
  });
}

export function createBufferInfo(gl, { arrays, indices }) {
  const attribs = Object.entries(arrays)
  .reduce((map, [key, value]) => ({
    ...map,
    [`a_${key}`]: {
      buffer: createBuffer(gl, createTypedArray(value.data, value.type)),
      numComponents: value.numComponents,
    },
  }), {});
  const bufferInfo = {
    attribs,
  };
  if (indices) {
    bufferInfo.indices = createBuffer(
      gl,
      createTypedArray(indices, Uint16Array),
      gl.ELEMENT_ARRAY_BUFFER,
    );
    bufferInfo.numElements = indices.length;
  } else {
    const [value] = Object.values(arrays);
    bufferInfo.numElements = value.data.length / value.numComponents;
  }
  return bufferInfo;
}

function createTypedArray(array, type) {
  const Type = type || Float32Array;
  return new Type(array);
}

export function drawBufferInfo(gl, bufferInfo, type = gl.TRIANGLES, count, offset = 0) {
  const { indices } = bufferInfo;
  const numElements = count || bufferInfo.numElements;
  if (indices) {
    gl.drawElements(type, numElements, gl.UNSIGNED_SHORT, offset);
  } else {
    gl.drawArrays(type, offset, numElements);
  }
}

export function createBuffer(gl, array, type = gl.ARRAY_BUFFER, drawType = gl.STATIC_DRAW) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType);
  return buffer;
}

export function createUniformSetters(gl, program) {
  const uniformSetters = {};
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < numUniforms; i += 1) {
    const uniformInfo = gl.getActiveUniform(program, i);
    uniformSetters[uniformInfo.name] = createUniformSetter(gl, program, uniformInfo);
  }
  return uniformSetters;
}

function createUniformSetter(gl, program, uniformInfo) {
  const { type } = uniformInfo;
  const loc = gl.getUniformLocation(program, uniformInfo.name);
  if (type === gl.FLOAT) return v => gl.uniform1f(loc, v);
  if (type === gl.FLOAT_VEC2) return v => gl.uniform2fv(loc, v);
  if (type === gl.FLOAT_VEC3) return v => gl.uniform3fv(loc, v);
  if (type === gl.FLOAT_VEC4) return v => gl.uniform4fv(loc, v);
  if (type === gl.INT) return v => gl.uniform1i(loc, v);
  if (type === gl.INT_VEC2) return v => gl.uniform2iv(loc, v);
  if (type === gl.INT_VEC3) return v => gl.uniform3iv(loc, v);
  if (type === gl.INT_VEC4) return v => gl.uniform4iv(loc, v);
  if (type === gl.FLOAT_MAT2) return v => gl.uniformMatrix2fv(loc, false, v);
  if (type === gl.FLOAT_MAT3) return v => gl.uniformMatrix3fv(loc, false, v);
  if (type === gl.FLOAT_MAT4) return v => gl.uniformMatrix4fv(loc, false, v);
}
