import * as Const from "../../core/const.js";
import Enemy from "./enemy.js";

export default class EnemyA extends Enemy {
  constructor() {
    super();
    this.score = 15;
    this.energy = 20;
    this.hitScore = 9;
    this.form = Math.random() < .5 ? 0 : 1;
    this.angle = Math.random() * (2 * Math.PI);
    this.angSpd = .5 * Math.random() * 3 + 1;

    if (this.form) {
      this.travel = Math.random() * 20 + 20;
      this.turnDir = 1;
      this.velocity.set(0, Math.random() * 20 + 10);
      this.pos.set(Math.random() * (Const.WIDTH - 60) + 30, -10);
    } else {
      const hw = Const.WIDTH / 2;
      this.velocity.set(Math.random() * 20 + 10, Math.random() * 10 + 5);
      this.travel = Math.random() * 4 + 1;
      this.turnDir = Math.random() < .5 ? -1 : 1;
      this.pos.set(Math.random() * hw + (hw >> 1), -15);
    }
  }

  // draw(ctx: CanvasRenderingContext2D) {
  //   this.drawBox(ctx);
  //   super.draw(ctx);
  // }

  update(dt: number) {
    if (!this.waitTimer) {
      const hw = Const.WIDTH / 2;

      if (this.form) {
        this.pos.x = (hw - this.travel) * Math.sin(this.angle) + hw;
        this.pos.y += dt * this.velocity.y * this.turnDir;
        if (Math.random() > .85 && (this.pos.y > Const.HEIGHT * .75) || (this.turnDir < 0 && this.pos.y < 20)) {
          this.turnDir = -this.turnDir;
        }
        if ((this.angle += dt * this.angSpd) > Const.TWO_PI) this.angle = 0;
      } else {
        if ((this.angle += dt * this.turnDir) > Const.TWO_PI) this.angle = 0;
        const ddt = dt * 8;
        this.pos.y += this.velocity.y * dt - this.velocity.x * ddt * Math.sin(this.angle) * Math.cos(this.angle);
        this.pos.x += this.velocity.x * Math.cos(this.angle) * this.angSpd * ddt * Math.sin(this.angle * this.travel * ddt);

        if (this.top > Const.HEIGHT) {
          this.pos.set(Math.random() * hw + (hw >> 1), -this.height);
          this.turnDir = Math.random() < .5 ? -1 : 1;
          this.angSpd = .5 * Math.random() * 3 + 1;
          this.travel = Math.random() * 4 + 1;
        }
      }
    } else {
      if ((this.waitTimer -= dt) < 0) {
        this.waitTimer = 0;
        this.attacking = true;
      }
    }
  }
}