import * as Const from "../core/const.js"
import Entity from "../core/entity";
import { R } from "../core/gameObj.js";

class EnemyB extends Entity {
  constructor() {
    super(0, 0);
    this.type = 1;
    this.score = 25;
    this.energy = 45;
    this.hitScore = 19.4;
    this.setImage(R.images[this.type + Const.BAD1]);
  }

  update(dt: number) {
    //
  }
}