import * as Const from "../../core/const.js"
import Wave from "./wave.js";

export default class WaveC extends Wave {
  constructor() {
    super();
  }

  create() {
    this.baddies = [];

    const a = this.baddiesCount[2][0] + Const.RND(2, 5),
      b = this.baddiesCount[2][1] + Const.RND(2, 5),
      c = this.baddiesCount[2][2] + Const.RND(2, 5),
      d = this.baddiesCount[2][3] + Const.RND(2, 5);

    for (let x = 0; x < c; x++) {
      this.startBadGuy(35, 65, 29, Const.BAD2);
      if (x < a) {
        this.startBadGuy(15, 20, 9.7, Const.BAD0);
      }
      if (x < b) {
        this.startBadGuy(25, 45, 19.4, Const.BAD1);
      }
      if (x < d) {
        this.startBadGuy(50, 80, 38, Const.BAD3);
      }
    }

    this.shuffleBaddies();
  }
}