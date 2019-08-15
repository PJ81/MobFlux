import * as Const from "./const.js";
import Entity from "./entity.js";
import Bullet from "./bullet.js";

export default class Player extends Entity {
  coolDownTime: number;
  moveLeft: boolean;
  moveRight: boolean;
  shield: HTMLImageElement;
  bullet: Entity;
  shots: Bullet[];
  shieldTime: number;
  lifeBar: HTMLImageElement;

  constructor(x: number, y: number, img: HTMLImageElement[]) {
    super(x, y);
    this.velocity.set(120, 0);
    this.energy = 100;
    this.coolDownTime = .1;
    this.moveLeft = this.moveRight = false;
    this.setImage(img[0]);
    this.shield = img[1];
    this.lifeBar = img[3]
    this.shieldTime = Const.SHIELD_TIME;
    this.bullet = new Entity(0, 0);
    this.bullet.setImage(img[2]);

    this.shots = [];
    for (let t = 0; t < 10; t++) {
      this.shots.push(new Bullet());
    }
  }

  getOneShot(): Bullet {
    for (const e of this.shots) {
      if (!e.alive) return e;
    }
    return null;
  }

  shoot(): boolean {
    if (!this.coolDownTime) {
      const blt = this.getOneShot();
      if (blt) {
        this.coolDownTime = 1;
        blt.start(this.left + (this.width >> 1), this.top + 5, 0, -80);
        return true;
      }
    }
    return false;
  }

  activateShield() {
    this.shieldTime = Const.SHIELD_TIME;
  }

  reset() {
    this.energy = 100;
    this.coolDownTime = .1;
    for (const e of this.shots) {
      e.alive = false;
    }
  }

  update(dt: number) {
    if (this.moveLeft && this.left > 2) this.pos.x -= dt * this.velocity.x;
    if (this.moveRight && this.right < Const.WIDTH - 2) this.pos.x += dt * this.velocity.x;

    if (this.coolDownTime && (this.coolDownTime -= dt) < 0) this.coolDownTime = 0;
    if (this.shieldTime && (this.shieldTime -= dt) < 0) this.shieldTime = 0;

    this.shots.forEach((e, idx) => {
      if (e.alive) {
        e.update(dt);
        if (e.pos.x < -this.bullet.width || e.pos.y < -this.bullet.height || e.pos.x > Const.WIDTH || e.pos.y > Const.HEIGHT) {
          this.shots[idx].alive = false;
        }
      }
    });

    this.energy -= dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.shots.forEach(e => {
      if (e.alive) {
        this.bullet.pos.set(e.pos.x, e.pos.y);
        this.bullet.draw(ctx);
      }
    });

    super.draw(ctx);

    if (this.shieldTime > 0) {
      ctx.globalAlpha = 1 / Const.SHIELD_TIME * this.shieldTime;
      ctx.drawImage(this.shield, this.left - 9, this.top - 9);
      ctx.globalAlpha = 1;
    }
    const dx = this.energy * this.lifeBar.width / 100;
    ctx.drawImage(this.lifeBar, 0, 0, dx, 4, 3, 3, dx, 4);
  }
}