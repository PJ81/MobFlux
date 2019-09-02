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
      this.travel = Math.random() * 60 + 60;
      this.turnDir = 1;
      this.velocity.set(0, Math.random() * 20 + 10);
    } else {
      this.velocity.set(Math.random() * 60 + 60, Math.random() * 10 + 15);
      this.travel = Math.random() * 4 + 1;
      this.turnDir = Math.random() < .5 ? -1 : 1;
    }
  }

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
        this.angle += dt * this.turnDir;
        this.pos.y += this.velocity.y * dt;
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