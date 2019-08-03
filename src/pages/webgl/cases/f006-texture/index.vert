attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
uniform mat4 u_worldViewProjection;
uniform mat4 u_world;
varying vec3 v_normal;
varying vec2 v_texCoord;

void main() {
  v_texCoord = a_texcoord;
  gl_Position = u_worldViewProjection * a_position;
  v_normal = mat3(u_world) * a_normal;
}
