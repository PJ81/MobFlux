import * as Const from "../core/const.js";
import Bullet from "./bullet.js";
import InitObj from "./initBltObj.js";

export default class BulletA extends Bullet {
  constructor() {
    super();
    this.partTime = .015;
    this.partTimer = 0;
    this.type = 0;
  }

  init(o: InitObj) {
    this.setImage(o.img, 0);
    this.pos.set(o.x, o.y);
    this.alive = true;
    this.velocity.set(0, -300);
  }

  update(dt: number) {
    this.pos.x += dt * this.velocity.x;
    this.pos.y += dt * this.velocity.y;
    if ((this.partTimer -= dt) < 0) {
      this.partTimer = this.partTime;
      this.startParticle(Const.RND(this.left, this.right), this.bottom + 3, 2, "rgba(190,255,111,");
    }
    if (!this.inBounds()) this.alive = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}