import * as Const from "../core/const.js";
import State from "./state.js";
import Entity from "../core/entity.js";
import { R } from "../core/gameObj.js";

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
  }

  draw(ctx: CanvasRenderingContext2D) {
    const w = this.width >> 1,
      h = this.height >> 1;
    ctx.save();
    ctx.translate(this.left + w, this.top + h)
    ctx.rotate(this.angle * this.turnDir)
    ctx.drawImage(this.imgFrames[this.animFrame], -w, -h);
    ctx.restore();
    this.alive = !((this.top - this.height) > Const.HEIGHT);
  }
}

class Stones {
  alive: boolean;
  stones: Stone[];
  reset: () => void;

  constructor() {
    this.alive = true;
    this.stones = [];

    this.reset = () => this.stones.forEach(s => this.setStone(s));

    for (let t = 0; t < 150; t++) {
      const s = new Stone();
      this.setStone(s);
      this.stones.push(s);
    }
  }

  setStone(s: Stone) {
    s.alive = true;
    s.type = Math.floor(Math.random() * 4);
    s.setImage(R.images[Const.STN0 + s.type], 0);
    s.pos.set(Const.RND(10, Const.WIDTH - 10), -Math.random() * Const.HEIGHT * 2.5);
    s.angle = Math.random() * Math.PI;
    s.turnSpd = Const.RND(40, 70) / 100;
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

export default class StateStn extends State {
  stones: Stones;

  constructor() {
    super();
    this.stones = new Stones();
    this.start = () => this.stones.reset();
    this.update = (dt: number): boolean => { return this.stones.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.stones.draw(ctx);
  }

  getEntities(): any[] {
    return this.stones.stones;
  }
}