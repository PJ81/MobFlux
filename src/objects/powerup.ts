import * as Const from "../core/const.js";
import Entity from "../core/entity.js";

export default class Powerup extends Entity {
  value: number;
  imgs: HTMLImageElement[];

  constructor(img: HTMLImageElement[]) {
    super(-60, -60);
    this.imgs = [img[0], img[1], img[2], img[3]];
    this.velocity.set(0, 90);
    this.alive = false;
    this.value = 0;
  }

  start(x: number, y: number) {
    this.alive = true;
    this.pos.set(x, y);
    this.value = Math.floor(Math.random() * 4);
    this.setImage(this.imgs[this.value], 0);
  }

  update(dt: number) {
    super.update(dt);
    this.pos.y += dt * this.velocity.y;
    this.alive = !(this.pos.y > Const.HEIGHT + this.height);
  }
}