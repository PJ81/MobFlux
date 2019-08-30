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
      this.startBadGuy(Const.BAD0);
      if (x < b) {
        this.startBadGuy(Const.BAD1);
      }
    }

    this.shuffleBaddies();
  }
}