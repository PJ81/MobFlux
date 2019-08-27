import Bullet from "./bullet.js";
import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import BulletA from "./bulletA.js";
import BulletB from "./bulletB.js";
import BulletC from "./bulletC.js";
import InitObj from "./initBltObj.js";

export default class Bullets {
  bullets: Bullet[];
  images: HTMLImageElement[];
  setImages: (img: HTMLImageElement[]) => HTMLImageElement[];

  constructor() {
    this.setImages = (img: HTMLImageElement[]) => this.images = img;
    this.bullets = [];

    for (let b = 0; b < 6; b++) {
      let blt: any;
      for (let t = 0; t < 20; t++) {
        switch (b) {
          case 0: blt = new BulletA(); break;
          case 1: blt = new BulletB(); break;
          case 2: blt = new BulletC(); break;
          case 3: blt = new Bullet(); break;;
          case 4: blt = new Bullet(); break;;
          case 5: blt = new Bullet(); break;;
        }
        this.bullets.push(blt);
      }
    }
  }

  private getOneShot(t: number): any {
    for (const e of this.bullets) {
      if (!e.alive && e.type === t) return e;
    }
    return null;
  }

  reset() {
    for (const e of this.bullets) {
      e.alive = false;
    }
  }

  start(x: number, y: number, type: number, trg: Entity[]): boolean {
    switch (type) {
      case 0:
        const blt: BulletA = this.getOneShot(type);
        if (!blt) return false;
        blt.init(new InitObj(this.images[type], x, y));
        break;
      case 1:
        const a = [1.8326, 1.5708, 1.309];
        for (let z = 0; z < 3; z++) {
          const blt: BulletB = this.getOneShot(type);
          if (!blt) return false;
          blt.init(new InitObj(this.images[type], x, y, 240 * Math.cos(a[z])));
        }
        break;
      case 2:
        const bt: BulletC = this.getOneShot(type);
        if (!bt) return false;
        bt.init(new InitObj(this.images[type], x, y, Const.RNDArr(trg)));
        break;
      // enemies
      case 3: break;
      case 4: break;
      case 5: break;
    }
    return true;
  }

  update(dt: number) {
    this.bullets.forEach(e => { if (e.alive) e.update(dt); });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.bullets.forEach(e => { if (e.alive) e.draw(ctx); });
  }
}