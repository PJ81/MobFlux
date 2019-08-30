import * as Const from "../../core/const.js"
import Wave from "./wave.js";

export default class WaveD extends Wave {
  constructor() {
    super();
  }

  create() {
    this.baddies = [];

    const a = this.baddiesCount[3][0] + Const.RND(2, 5),
      b = this.baddiesCount[3][1] + Const.RND(2, 5),
      c = this.baddiesCount[3][2] + Const.RND(2, 5),
      d = this.baddiesCount[3][3] + Const.RND(2, 5),
      e = this.baddiesCount[3][4] + Const.RND(2, 5);

    for (let x = 0; x < d; x++) {
      this.startBadGuy(Const.BAD3);
      if (x < a) {
        this.startBadGuy(Const.BAD0);
      }
      if (x < b) {
        this.startBadGuy(Const.BAD1);
      }
      if (x < c) {
        this.startBadGuy(Const.BAD2);
      }
      if (x < e) {
        this.startBadGuy(Const.BAD4);
      }
    }

    this.shuffleBaddies();
  }
}