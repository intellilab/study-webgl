precision mediump float;
uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;
uniform sampler2D u_diffuse;
varying vec3 v_normal;
varying vec2 v_texCoord;
void main() {
  vec4 diffuseColor = texture2D(u_diffuse, v_texCoord);
  vec3 normal = normalize(v_normal);
  float light = abs(dot(normal, u_reverseLightDirection));
  gl_FragColor = vec4(diffuseColor.r * light * u_color.rgb, diffuseColor.a);
}
