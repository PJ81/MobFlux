import Enemy from "./enemy.js";

export default class EnemyC extends Enemy {
  constructor() {
    super();
    this.score = 35;
    this.energy = 65;
    this.hitScore = 29;
  }

  update(dt: number) {
    //
  }
}