import * as Const from "../core/const.js"
import Entity from "../core/entity";
import { R } from "../core/gameObj.js";

class EnemyA extends Entity {
  constructor() {
    super(0, 0);
    this.type = 0;
    this.score = 15;
    this.energy = 20;
    this.hitScore = 9.7;
    this.setImage(R.images[this.type + Const.BAD0]);
  }

  update(dt: number) {
    //
  }
}