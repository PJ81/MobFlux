import * as Const from "../../core/const.js";
import Enemy from "./enemy.js";

export default class EnemyB extends Enemy {
  constructor() {
    super();
    this.score = 25;
    this.energy = 45;
    this.hitScore = 19;

    this.velocity.set((Math.random() * 3 + 2) / 50, (Math.random() * 4 + 1) / 50);
  }

  update(dt: number) {
    if (!this.waitTimer) {
      if ((this.angle += dt) > 2 * Math.PI) this.angle = 0;
      if ((this.travel += this.velocity.x * dt) > 2 * Math.PI) this.travel = 0;

      this.pos.set(
        this.pos.x + this.velocity.x * Math.cos(this.angle) - this.velocity.y * Math.sin(this.travel),
        this.pos.y + this.velocity.y * Math.sin(this.travel) + 5 * dt);

      if (this.pos.y > Const.HEIGHT) {
        const z = (Const.WIDTH >> 1);
        this.pos.set(Math.random() * z + (z >> 1), -50);
        this.velocity.set((Math.random() * 3 + 2) / 50, (Math.random() * 4 + 1) / 50);
      }
    } else {
      super.update(dt);
    }
  }
}