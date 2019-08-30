import * as Const from "../../core/const.js"
import Wave from "./wave.js";

export default class WaveB extends Wave {
  constructor() {
    super();
  }

  create() {
    this.baddies = [];

    const a = this.baddiesCount[1][0] + Const.RND(2, 5),
      b = this.baddiesCount[1][1] + Const.RND(2, 5),
      c = this.baddiesCount[1][2] + Const.RND(2, 5);

    for (let x = 0; x < b; x++) {
      this.startBadGuy(Const.BAD1);
      if (x < a) {
        this.startBadGuy(Const.BAD0);
      }
      if (x < c) {
        this.startBadGuy(Const.BAD2);
      }
    }

    this.shuffleBaddies();
  }
}