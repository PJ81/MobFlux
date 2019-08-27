import * as Const from "../../core/const.js"
import Entity from "../../core/entity";
import { R } from "../../core/gameObj.js";

class EnemyC extends Entity {
  constructor() {
    super(0, 0);
    this.type = 2;
    this.score = 35;
    this.energy = 65;
    this.hitScore = 29;
    this.setImage(R.images[this.type + Const.BAD2]);
  }

  update(dt: number) {
    //
  }
}