import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { P } from "../core/gameObj.js";
import Point from "../core/point.js";

export default class Bullet extends Entity {
  target: Point;
  alive: boolean;
  partTime: number[][];

  constructor() {
    super(0, 0);
    this.partTime = [[0, .015], [0, .04], [0, .05], [0, 0], [0, 0], [0, 0]];
    this.alive = false;
    this.target = new Point();
    this.angle = 0;
  }

  update(dt: number) {
    for (let t = 0; t < 6; t++) this.partTime[t][0] -= dt;

    switch (this.type) {
      case 0:
        this.pos.x += dt * this.velocity.x;
        this.pos.y += dt * this.velocity.y;
        if (this.partTime[this.type][0] < 0)
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 2, "rgba(190,255,111,");
        break;
      case 1:
        if ((this.angle += dt * 8) > Const.TWO_PI) this.angle = 0;
        this.pos.x += dt * this.velocity.x + .12 * Math.sin(this.angle);
        this.pos.y += dt * this.velocity.y;
        if (this.partTime[this.type][0] < 0) {
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 1, "rgba(109,221,24,");
        }
        break;
      case 2:
        break;
      // enemies bullets
      case 3: break;
      case 4: break;
      case 5: break;
    }

    for (let t = 0; t < 6; t++) {
      if (this.partTime[t][0] < 0) {
        this.partTime[t][0] = this.partTime[t][1];
      }
    }
    this.checkBounds();
  }
}