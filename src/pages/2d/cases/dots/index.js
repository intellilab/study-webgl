import React from '@gera2ld/jsx-dom';

const WIDTH = 800;
const HEIGHT = 600;
const PERSPECTIVE = 600;
const GLOBE_RADIUS = 400;
const DOT_RADIUS = 6;

class Dot {
  constructor() {
    this.radius = DOT_RADIUS;
    this.theta = Math.random() * 2 * Math.PI;
    this.phi = (Math.random() - 0.5) * Math.PI;
  }

  draw(ctx, alpha) {
    this.x = GLOBE_RADIUS * Math.cos(this.phi) * Math.cos(this.theta);
    this.y = GLOBE_RADIUS * Math.cos(this.phi) * Math.sin(this.theta);
    this.z = GLOBE_RADIUS * Math.sin(this.phi);
    const cosA = Math.cos(alpha);
    const sinA = Math.sin(alpha);
    const z = this.z * cosA - this.x * sinA;
    const x = this.z * sinA + this.x * cosA;
    this.scale = PERSPECTIVE / (PERSPECTIVE + GLOBE_RADIUS - z);
    this.xProjected = x * this.scale + WIDTH / 2;
    this.yProjected = HEIGHT / 2 - this.y * this.scale;
    ctx.globalAlpha = (1 + z / GLOBE_RADIUS) / 2;
    ctx.beginPath();
    ctx.arc(this.xProjected, this.yProjected, DOT_RADIUS * this.scale, 0, 2 * Math.PI);
    ctx.fill();
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
