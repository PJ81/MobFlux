import * as Const from "../../core/const.js"
import Entity from "../../core/entity";
import { R } from "../../core/gameObj.js";

class EnemyD extends Entity {
  constructor() {
    super(0, 0);
    this.type = 3;
    this.score = 50;
    this.energy = 80;
    this.hitScore = 38;
    this.setImage(R.images[this.type + Const.BAD3]);
  }

  update(dt: number) {
    //
  }
}