import Entity from "./entity.js";
import * as Const from "./const.js"

class Stone extends Entity {
  turnSpd: number;
  type: number;

  constructor() {
    super(0, 0);
    this.type;
    this.turnSpd;
    this.turnDir;
  }

  update(dt: number) {
    this.pos.x += (this.velocity.x + Math.sin(this.angle)) * dt;
    this.pos.y += this.velocity.y * dt * 3;
    this.angle += dt * this.turnSpd;
    if (this.angle > Const.TWO_PI) this.angle = 0;
    if (this.top > Const.HEIGHT) {
      this.alive = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const w = this.width >> 1,
      h = this.height >> 1;
    ctx.save();
    ctx.translate(this.left + w, this.top + h)
    ctx.rotate(this.angle * this.turnDir)
    ctx.drawImage(this.frames[this.animFrame], -w, -h);
    ctx.restore();
  }
}

export default class Stones {
  alive: boolean;
  stones: Stone[];
  reset: () => void;

  constructor(imgs: HTMLImageElement[]) {
    this.alive = true;
    this.stones = [];
    this.reset = () => this.stones.forEach(s => this.setStone(s));


    for (let t = 0; t < 150; t++) {
      const s = new Stone();
      s.type = Math.floor(Math.random() * 4);
      s.setImage(imgs[s.type]);
      this.setStone(s);
      this.stones.push(s);
    }
  }

  setStone(s: Stone) {
    s.alive = true;
    s.pos.set(Math.random() * Const.WIDTH, -Math.random() * Const.HEIGHT * 3);
    s.angle = Math.random() * Math.PI;
    s.turnSpd = (Math.random() * 70 + 40) / 100;
    s.turnDir = Math.random() > .5 ? 1 : -1;
    s.velocity.set(0, Math.random() * 20 + [5, 15, 25, 35][s.type]);
  }



  update(dt: number): boolean {
    const a = this.stones.filter(e => e.alive);
    a.forEach(s => s.update(dt));
    return a.length > 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.stones.forEach(e => { if (e.alive && e.pos.y > -50) e.draw(ctx); });
  }
}