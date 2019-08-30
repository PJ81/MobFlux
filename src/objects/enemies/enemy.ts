import Entity from "../../core/entity.js";

export default class Enemy extends Entity {
  fireTimer: number;
  fireTime: number;

  constructor() {
    super();
    this.fireTimer;
    this.fireTime;
  }
}