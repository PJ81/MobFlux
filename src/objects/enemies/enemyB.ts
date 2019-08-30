import Enemy from "./enemy.js";

export default class EnemyB extends Enemy {
  constructor() {
    super();
    this.score = 25;
    this.energy = 45;
    this.hitScore = 19;
  }

  update(dt: number) {
    //
  }
}