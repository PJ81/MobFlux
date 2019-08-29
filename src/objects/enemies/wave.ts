import * as Const from "../../core/const.js"
import { R } from "../../core/gameObj.js";
import Enemy from "./enemy.js";
import Entity from "../../core/entity.js";

export default class Wave {
  create() {
    throw new Error("Method not implemented.");
  }

  baddies: Enemy[];
  baddiesCount: number[][];

  constructor() {
    this.baddies = [];
    //this.baddiesCount = [[22, 15], [18, 25, 13], [11, 22, 25, 13], [5, 18, 25, 30, 16]];
    this.baddiesCount = [[17, 10], [13, 20, 8], [6, 7, 20, 8], [0, 13, 20, 25, 11]];
  }

  update(dt: number) {
    const a = this.baddies.filter(e => e.alive);
    a.forEach(s => s.update(dt));
    return a.length > 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.baddies.forEach(e => { if (e.alive) e.draw(ctx); });
  }

  startBadGuy(sc: number, en: number, hit: number, img: number) {
    const e = new Entity();
    e.score = sc;
    e.energy = en;
    e.hitScore = hit;
    e.setImage(R.images[Const.BAD0]);
    this.baddies.push(e);
  }

  shuffleBaddies() {
    for (let i = this.baddies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.baddies[i], this.baddies[j]] = [this.baddies[j], this.baddies[i]];
    }
  }
}