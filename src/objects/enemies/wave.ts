import * as Const from "../../core/const.js"
import Entity from "../../core/entity.js";
import { R } from "../../core/gameObj.js";
import Enemy from "./enemy.js";
import EnemyA from "./enemyA.js";
import EnemyB from "./enemyB.js";
import EnemyC from "./enemyC.js";
import EnemyD from "./enemyD.js";
import EnemyE from "./enemyE.js";

export default class Wave {
  create() {
    throw new Error("Method not implemented.");
  }

  baddies: Enemy[];
  baddiesCount: number[][];

  constructor() {
    this.baddies = [];
    this.baddiesCount = [[17, 10], [13, 20, 8], [6, 7, 20, 8], [0, 13, 20, 25, 11]];
  }

  update(dt: number) {
    const a = this.baddies.filter(e => e.alive);
    a.forEach(s => s.update(dt));
    return a.length > 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.baddies.forEach(e => { if (e.alive && e.attacking) e.draw(ctx); });
  }

  startBadGuy(img: number, wt: number) {
    let e: Enemy;
    switch (img) {
      case Const.BAD0: e = new EnemyA(); break;
      case Const.BAD1: e = new EnemyB(); break;
      case Const.BAD2: e = new EnemyC(); break;
      case Const.BAD3: e = new EnemyD(); break;
      case Const.BAD4: e = new EnemyE(); break;
      default: e = new EnemyA(); break;
    }
    e.waitTimer = wt;
    e.setImage(R.images[img], 0);
    this.baddies.push(e);
  }

  shuffleBaddies() {
    for (let i = this.baddies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.baddies[i], this.baddies[j]] = [this.baddies[j], this.baddies[i]];
    }
  }
}