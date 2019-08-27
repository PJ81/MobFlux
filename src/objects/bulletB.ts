import * as Const from "../core/const.js";
import Bullet from "./bullet.js";
import InitObj from "./initBltObj.js";

export default class BulletB extends Bullet {
  constructor() {
    super();
    this.partTime = .04;
    this.partTimer = 0;
    this.type = 1;
  }

  init(o: InitObj) {
    this.setImage(o.img, 0);
    this.pos.set(o.x, o.y);
    this.alive = true;
    this.velocity.set(o.e, -240);
  }

  update(dt: number) {
    if ((this.angle += dt * 8) > Const.TWO_PI) this.angle = 0;
    this.pos.x += dt * this.velocity.x + .12 * Math.sin(this.angle);
    this.pos.y += dt * this.velocity.y;
    if ((this.partTimer -= dt) < 0) {
      this.partTimer = this.partTime;
      this.startParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
      this.startParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
    }
    if (!this.inBounds()) this.alive = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}