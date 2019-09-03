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

    let wt = 2;
    for (let x = 0; x < c; x++) {
      this.startBadGuy(Const.BAD2, wt);
      wt += .5 + Math.random();
      if (x < a) {
        this.startBadGuy(Const.BAD0, wt);
        wt += .5 + Math.random();
      }
      if (x < b) {
        this.startBadGuy(Const.BAD1, wt);
        wt += .5 + Math.random();
      }
      if (x < d) {
        this.startBadGuy(Const.BAD3, wt);
        wt += .5 + Math.random();
      }
    }

    this.shuffleBaddies();
  }
}