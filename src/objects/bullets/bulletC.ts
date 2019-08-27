import * as Const from "../../core/const.js";
import Bullet from "./bullet.js";
import Point from "../../core/point.js";
import Entity from "../../core/entity.js";
import InitObj from "../../core/initBltObj.js";

export default class BulletC extends Bullet {
  lastDes: Point;
  target: Entity;

  constructor() {
    super();
    this.target = null;
    this.lastDes = new Point(0, -1);
    this.partTime = .025;
    this.partTimer = 0;
    this.type = 2;
  }

  init(o: InitObj) {
    this.setImage(o.img, 0);
    this.pos.set(o.x, o.y);
    this.lastDes.set(0, -1);
    this.alive = true;
    this.velocity.set(0, -100);
    this.target = o.e;
  }

  steer(): Point {
    if (this.target && this.target.alive) {
      const desired = this.pos.heading(this.target.pos);
      desired.set(desired.x * 350, desired.y * 350);
      desired.set(desired.x - this.velocity.x, desired.y - this.velocity.y);
      desired.limit(.5);
      this.lastDes.set(desired.x, desired.y);
      return desired;
    }
    return this.lastDes;
  }

  update(dt: number) {
    this.pos.x += dt * this.velocity.x;
    this.pos.y += dt * this.velocity.y;
    const st = this.steer();
    this.velocity.x += st.x;
    this.velocity.y += st.y;
    this.velocity.limit(350);
    this.angle = this.velocity.angle();
    if ((this.partTimer -= dt) < 0) {
      this.partTimer = this.partTime;
      const pt = new Point(Const.RND(-2, 2), 0);
      pt.rotate(this.angle);
      this.startParticle(this.pos.x + pt.x, this.pos.y + pt.y, 2, "rgba(221,221,24,");
    }
    if (!this.inBounds()) this.alive = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const i = this.imgFrames[0],
      w = i.width >> 1,
      h = i.height >> 1;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.drawImage(i, -w, -h);
    ctx.restore();
  }
}