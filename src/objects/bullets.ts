import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { P } from "../core/gameObj.js";

class Bullet extends Entity {
  alive: boolean;
  partTime: number[];
  times: number[];

  constructor() {
    super(0, 0);
    this.times = [.015, 0, 0, 0];
    this.partTime = [0, 0, 0, 0];
    this.alive = false;
  }

  update(dt: number) {
    this.pos.x += dt * this.velocity.x;
    this.pos.y += dt * this.velocity.y;

    for (let t = 0; t < 4; t++) this.partTime[t] -= dt;

    switch (this.type) {
      case 0:
        if (this.partTime[this.type] < 0)
          P.addParticle(Const.RND(this.left, this.right), this.bottom + 3, 2, "rgba(190,255,111,");
        break;
      case 1: break;
      case 2: break;
      case 3: break;
    }

    for (let t = 0; t < 4; t++) {
      if (this.partTime[t] < 0) {
        this.partTime[t] = this.times[t];
      }
    }
    this.checkBounds();
  }
}

export default class Bullets {
  bullets: Bullet[];
  images: HTMLImageElement[];

  constructor() {
    this.bullets = [];
    for (let t = 0; t < 100; t++) {
      this.bullets.push(new Bullet());
    }
  }

  setImages(img: HTMLImageElement[]) {
    this.images = [img[0], img[1], img[2], img[3]];
  }

  private getOneShot(): Bullet {
    for (const e of this.bullets) {
      if (!e.alive) return e;
    }
    return null;
  }

  reset() {
    for (const e of this.bullets) {
      e.alive = false;
    }
  }

  start(x: number, y: number, type: number): boolean {
    const blt = this.getOneShot();
    if (!blt) return false;

    blt.setImage(this.images[type], 0);
    blt.pos.set(x, y);
    blt.alive = true;
    blt.type = type;

    switch (type) {
      case 0: blt.velocity.set(0, -300); break;
      case 1:
        blt.velocity.set(0, 0);
        blt.score = 6;
        blt.hitScore = 15;
        break;
      case 2: break;
      case 3: break;
    }
    return true;
  }

  update(dt: number) {
    this.bullets.forEach(e => { if (e.alive) e.update(dt); });
    P.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.bullets.forEach(e => { if (e.alive) e.draw(ctx); });
    P.draw(ctx);
  }
}