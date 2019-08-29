import * as Const from "../../core/const.js"
import Wave from "./wave.js";

export default class WaveA extends Wave {
  constructor() {
    super();
  }

  create() {
    this.baddies = [];

    const a = this.baddiesCount[0][0] + Const.RND(2, 5),
      b = this.baddiesCount[0][1] + Const.RND(2, 5);

    for (let x = 0; x < a; x++) {
      this.startBadGuy(15, 20, 9.7, Const.BAD0);
      if (x < b) {
        this.startBadGuy(25, 45, 19.4, Const.BAD1);
      }
    }

    this.shuffleBaddies();
  }
}