import Enemy from "./enemy.js";

export default class EnemyA extends Enemy {
  constructor() {
    super();
    this.score = 15;
    this.energy = 20;
    this.hitScore = 9;
  }

  update(dt: number) {
    //
  }
}