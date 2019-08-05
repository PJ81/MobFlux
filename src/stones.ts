import Entity from "./entity.js";
import * as Const from "./const.js"

class Stone extends Entity {
  constructor(x: number, y: number) {
    super(x, y);
    this.direction = Math.random() > .5 ? 1 : -1;
  }

  update(dt: number) {
    this.pos.x += this.velocity.x * dt;
    this.pos.y += this.velocity.y * dt;
    this.angle += dt;
    if (this.angle > 2 * Math.PI) this.angle = 0;
    if (this.top > Const.HEIGHT) {
      this.alive = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const w = this.width >> 1,
      h = this.height >> 1;
    ctx.save();
    ctx.translate(this.left + w, this.top + h)
    ctx.rotate(this.angle * this.direction)
    ctx.drawImage(this.frames[this.animFrame], -w, -h);
    ctx.restore();
  }
}

export default class Stones {
  alive: boolean;
  stones: Stone[];

  constructor(imgs: HTMLImageElement[]) {
    this.alive = true;
    this.stones = [];
    for (let s = 0; s < 100; s++) {
      const t = new Stone(Math.random() * Const.WIDTH, -Math.random() * (Const.HEIGHT << 2)),
        a = Math.floor(Math.random() * 4);
      t.setImage(imgs[a]);
      t.velocity.set(0, Math.random() * 20 + [5, 15, 25, 35][a]);
      t.angle = Math.random() * Math.PI;
      this.stones.push(t);
    }
  }

  update(dt: number) {
    this.alive = false;
    for (let s of this.stones) {
      if (s.alive) {
        s.update(dt);
        this.alive = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.stones.forEach(e => { if (e.alive) e.draw(ctx); });
  }
}