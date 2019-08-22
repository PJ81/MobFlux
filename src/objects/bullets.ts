import Bullet from "./bullet.js";

export default class Bullets {
  bullets: Bullet[];
  images: HTMLImageElement[];

  constructor() {
    this.bullets = [];
    for (let t = 0; t < 120; t++) {
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


    switch (type) {
      case 0:
        const blt = this.getOneShot();
        if (!blt) return false;
        blt.setImage(this.images[type], 0);
        blt.pos.set(x, y);
        blt.alive = true;
        blt.type = type;
        blt.velocity.set(0, -300);
        break;
      case 1:
        const a = [1.8326, 1.5708, 1.309];
        for (let z = 0; z < 3; z++) {
          const blt = this.getOneShot();
          if (!blt) return false;
          blt.setImage(this.images[type], 0);
          blt.pos.set(x, y);
          blt.alive = true;
          blt.type = type;
          blt.velocity.set(240 * Math.cos(a[z]), -240);
        }
        break;
      case 2: break;
      // enemies
      case 3:
        blt.velocity.set(0, 0);
        blt.score = 6;
        blt.hitScore = 15;
        break;
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