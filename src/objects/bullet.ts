import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { P } from "../core/gameObj.js";
import Point from "../core/point.js";

export default class Bullet extends Entity {
  target: Entity;
  alive: boolean;
  lastDes: Point;
  partTime: number[][];

  constructor() {
    super(0, 0);
    this.partTime = [[0, .015], [0, .04], [0, .05], [0, 0], [0, 0], [0, 0]];
    this.alive = false;
    this.target = null;
    this.angle = 0;
    this.lastDes = new Point(0, -1);
  }

  steer(): Point {
    if (this.target && this.target.alive) {
      const desired = this.pos.heading(this.target.pos);
      desired.set(desired.x * 250, desired.y * 250);
      desired.set(desired.x - this.velocity.x, desired.y - this.velocity.y);
      desired.limit(.2);
      this.lastDes.set(desired.x, desired.y);
      return desired;
    }
    return this.lastDes;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.type === 2) {
      const i = this.imgFrames[0],
        w = i.width >> 1,
        h = i.height >> 1;
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(this.angle);
      ctx.drawImage(i, -w, -h);
      ctx.restore();
    } else {
      super.draw(ctx);
    }
  }

  update(dt: number) {
    for (let t = 0; t < 6; t++) this.partTime[t][0] -= dt;

    switch (this.type) {
      case 0:
        this.pos.x += dt * this.velocity.x;
        this.pos.y += dt * this.velocity.y;
        if (this.partTime[this.type][0] < 0)
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 2, "rgba(190,255,111,");
        break;
      case 1:
        if ((this.angle += dt * 8) > Const.TWO_PI) this.angle = 0;
        this.pos.x += dt * this.velocity.x + .12 * Math.sin(this.angle);
        this.pos.y += dt * this.velocity.y;
        if (this.partTime[this.type][0] < 0) {
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
        }
        break;
      case 2:
        this.pos.x += dt * this.velocity.x;
        this.pos.y += dt * this.velocity.y;
        const st = this.steer();
        this.velocity.x += st.x;
        this.velocity.y += st.y;
        this.velocity.limit(250);
        this.angle = this.velocity.angle();
        if (this.partTime[this.type][0] < 0) {
          const pt = new Point(this.left - 2, Const.RND(this.top, this.bottom));
          pt.rotate(-this.angle);
          P.addParticle(pt.y, pt.x + this.pos.y, 2, "rgba(221,221,24,");
        }
        break;
      // enemies bullets
      case 3: break;
      case 4: break;
      case 5: break;
    }

    for (let t = 0; t < 6; t++) {
      if (this.partTime[t][0] < 0) {
        this.partTime[t][0] = this.partTime[t][1];
      }
    }
    if (!this.inBounds()) {
      this.alive = false;
    }
  }
}