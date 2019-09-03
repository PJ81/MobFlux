import Entity from "../../core/entity.js";

export default class Enemy extends Entity {
  fireTimer: number;
  fireTime: number;
  waitTimer: number;
  attacking: boolean;
  form: number;
  angSpd: number;
  travel: number;

  constructor() {
    super();
    this.fireTimer = 0;
    this.fireTime = 0;
    this.waitTimer = 0;
    this.form = 0;
    this.angSpd = 0
    this.travel = 0;
    this.attacking = false;
  }

  update(dt: number) {
    if ((this.waitTimer -= dt) < 0) {
      this.waitTimer = 0;
      this.attacking = true;
    }
  }
}