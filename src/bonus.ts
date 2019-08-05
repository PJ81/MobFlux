import * as Const from "./const.js";
import Entity from "./entity.js";

export default class Bonus extends Entity {
  value: number;

  constructor(img: HTMLImageElement[]) {
    super(-60, -60);
    this.setImage(img[0]);
    this.setImage(img[1]);
    this.animTimer = 1;
    this.hasAnimation = true;
    this.velocity.set(0, 30);
    this.alive = false;
    this.value = 0;
  }

  start(x: number, y: number) {
    this.alive = true;
    this.pos.set(x, y);
    this.value = Math.floor(Math.random() * 3);
  }

  update(dt: number) {
    super.update(dt);
    //this.pos.x += dt * this.velocity.x;
    this.pos.y += dt * this.velocity.y;
    this.alive = !(this.pos.y > Const.HEIGHT + this.height);
  }
}