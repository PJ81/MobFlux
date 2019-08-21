import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { R } from "../core/gameObj.js";

class Powerup extends Entity {
  constructor() {
    super(-60, -60);
    this.velocity.set(0, 90);
    this.alive = false;
  }

  start(x: number, y: number, type: number) {
    this.alive = true;
    this.pos.set(x, y);
    this.type = type;
    this.setImage(R.images[this.type + Const.POW0], 0);
  }

  update(dt: number) {
    super.update(dt);
    this.pos.y += dt * this.velocity.y;
    this.alive = !(this.pos.y > Const.HEIGHT + this.height);
  }
}

export default class Powerups {
  powerups: Powerup[];

  constructor() {
    this.powerups = [];
    for (let z = 0; z < 15; z++) {
      this.powerups.push(new Powerup());
    }
  }

  private getOnePOW(): Powerup {
    for (const e of this.powerups) {
      if (!e.alive) return e;
    }
    return null;
  }

  start(x: number, y: number) {
    const p = this.getOnePOW();
    if (!p) return;
    p.start(x, y, Math.floor(Math.random() * 4));
  }

  update(dt: number) {
    this.powerups.forEach(e => { if (e.alive) e.update(dt); })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.powerups.forEach(e => { if (e.alive) e.draw(ctx); })
  }
}