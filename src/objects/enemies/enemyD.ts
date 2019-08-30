import Enemy from "./enemy.js";

export default class EnemyD extends Enemy {
  constructor() {
    super();
    this.score = 50;
    this.energy = 80;
    this.hitScore = 38;
  }

  update(dt: number) {
    //
  }
}