import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { R, P } from "../core/gameObj.js";

class Powerup extends Entity {
  partTimer: number;
  colors: string[];

  constructor() {
    super(-60, -60);
    this.velocity.set(0, 90);
    this.alive = false;
    this.partTimer = .1;
    this.colors = ["rgba(24,231,0,", "rgba(212,231,0,", "rgba(0,91,228,", "rgba(212,0,56,"];
  }

  start(x: number, y: number, type: number) {
    this.alive = true;
    this.pos.set(x, y);
    this.type = type;
    this.setImage(R.images[this.type + Const.POW0], 0);
    switch (type) {
      case 0: this.score = Const.RND(1, 3); break;// weapon
      case 1: this.score = Const.RND(5, 15); break;//shield
      case 2: this.score = Const.RND(20, 60); break;//life
      case 3: break;//fire
    }
  }

  update(dt: number) {
    super.update(dt);
    this.pos.y += dt * this.velocity.y;
    if ((this.partTimer -= dt) < 0) {
      this.partTimer = .1;
      let a: number;
      for (let z = 0; z < 3; z++) {
        a = Math.random() * Const.TWO_PI;
        P.addParticle(Const.RND(this.left, this.right), this.bottom, 2, this.colors[this.type], Math.cos(a) * Const.RND(20, 40), Math.sin(a) * Const.RND(20, 40));
      }
    }
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