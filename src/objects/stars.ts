import * as Const from "../core/const.js";
import Point from "../core/point.js";

class Star {
  pos: Point;
  size: number;
  speed: number;
  color: string;

  constructor(x: number, y: number, p: number) {
    this.pos = new Point(x, y);
    let s: number, z: number, c: string;
    const clr = ["rgba(219,219,219,", "rgba(255,166,166,", "rgba(166,228,255,", "rgba(255,216,166,"];

    switch (p) {
      case 1:
        z = 1;
        s = 1;
        c = `${clr[Math.floor(Math.random() * 4)]}.4)`;
        break;
      case 2:
        z = 1.4;
        s = 3;
        c = `${clr[Math.floor(Math.random() * 4)]}.6)`;
        break;
      case 3:
        z = 1.5;
        s = 6;
        c = `${clr[Math.floor(Math.random() * 4)]}.9)`
        break;
    }
    this.size = z;
    this.speed = 45 * s;
    this.color = c;
  }

  update(dt: number) {
    this.pos.y += this.speed * dt;
    if (this.pos.y > Const.HEIGHT) {
      this.pos.set(Math.random() * Const.WIDTH, -Math.random() * 50);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const s = this.size >> 1;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x - s, this.pos.y - s, this.size, this.size);
  }
}

export default class Stars {
  stars: Star[];

  constructor() {
    this.stars = [];
    for (let d = 0; d < 30; d++) {
      this.stars.push(new Star(Math.random() * Const.WIDTH, Math.random() * Const.HEIGHT, 1));
      this.stars.push(new Star(Math.random() * Const.WIDTH, Math.random() * Const.HEIGHT, 1));
      this.stars.push(new Star(Math.random() * Const.WIDTH, Math.random() * Const.HEIGHT, 2));
      this.stars.push(new Star(Math.random() * Const.WIDTH, Math.random() * Const.HEIGHT, 3));
    }
  }

  update(dt: number) {
    for (let s of this.stars) {
      s.update(dt);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let s of this.stars) {
      s.draw(ctx);
    }
  }
}