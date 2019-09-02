import Entity from "../../core/entity.js";

export default class Enemy extends Entity {
  fireTimer: number;
  fireTime: number;
  waitTimer: number;
  attacking: boolean;

  constructor() {
    super();
    this.fireTimer = 0;
    this.fireTime = 0;
    this.waitTimer = 0;
    this.attacking = false;
  }
}