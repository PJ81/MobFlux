import Enemy from "./enemy.js";

export default class EnemyE extends Enemy {
  constructor() {
    super();
    this.score = 70;
    this.energy = 85;
    this.hitScore = 43;
  }

  update(dt: number) {
    //
  }
}