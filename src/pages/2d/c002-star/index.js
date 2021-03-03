import * as React from '@gera2ld/jsx-dom';
import { m3 } from '#/common/util';

const WIDTH = 800;
const HEIGHT = 600;
const PERSPECTIVE = 600;
const GLOBE_RADIUS = 400;
const DOT_RADIUS = 6;

const STAR_WIDTH = 20;
const STAR_HEIGHT = 20;
let point1 = [0, 1];
let point2 = m3.transform(
  m3.scaling(0.5, 0.5),
  m3.rotation(Math.PI / 5),
  point1,
);
const points = [point1, point2];
{
  const mRotate = m3.rotation(Math.PI * 2 / 5);
  for (let i = 0; i < 4; i += 1) {
    point1 = m3.transform(mRotate, point1);
    point2 = m3.transform(mRotate, point2);
    points.push(point1, point2);
  }
}
const STAR_POINTS = points.map(([x, y]) => [
  STAR_WIDTH * (x + 1) / 2,
  STAR_HEIGHT * (1 - y) / 2,
]);
function createStar() {
  const canvas = <canvas width={STAR_WIDTH} height={STAR_HEIGHT} />;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.moveTo(STAR_POINTS[0][0], STAR_POINTS[0][1]);
  for (let i = 1; i < STAR_POINTS.length; i += 1) {
    ctx.lineTo(STAR_POINTS[i][0], STAR_POINTS[i][1]);
  }
  ctx.fill();
  return canvas;
}

const star = createStar();

class Dot {
  constructor() {
    this.radius = DOT_RADIUS;
    this.theta = Math.random() * 2 * Math.PI;
    this.phi = Math.acos(Math.random() * 2 - 1) - Math.PI / 2;
  }

  draw(ctx, alpha) {
    this.x = GLOBE_RADIUS * Math.cos(this.phi) * Math.cos(this.theta);
    this.y = GLOBE_RADIUS * Math.sin(this.phi);
    this.z = GLOBE_RADIUS * Math.cos(this.phi) * Math.sin(this.theta);
    const [z, x] = m3.transform(
      m3.rotation(alpha),
      [this.z, this.x],
    );
    const scale = PERSPECTIVE / (PERSPECTIVE + GLOBE_RADIUS - z);
    const [xProjected, yProjected] = m3.transform(
      m3.translation(WIDTH / 2, HEIGHT / 2),
      m3.scaling(scale, -scale),
      [x, this.y],
    );
    ctx.globalAlpha = (1 + z / GLOBE_RADIUS) / 2;
    ctx.drawImage(
      star,
      xProjected - STAR_WIDTH / 2,
      yProjected - STAR_HEIGHT / 2,
      STAR_WIDTH,
      STAR_HEIGHT,
    );
  }
}

export default function init(container) {
  const canvas = <canvas width={WIDTH} height={HEIGHT} />;
  container.append(canvas);

  const dots = [];
  for (let i = 0; i < 1000; i += 1) {
    const dot = new Dot();
    dots.push(dot);
  }

  let alpha = 0;
  animate();

  function render() {
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    dots.forEach((dot) => {
      dot.draw(ctx, alpha);
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
    alpha += 0.01;
  }
}
