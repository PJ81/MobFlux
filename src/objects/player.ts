import * as Const from "../core/const.js";
import Entity from "../core/entity.js";


export default class Player extends Entity {
  coolDownTime: number;
  shieldTime: number;
  moveLeft: boolean;
  moveRight: boolean;
  shield: HTMLImageElement;
  lifeBar: HTMLImageElement;

  constructor(x: number, y: number, img: HTMLImageElement[]) {
    super(x, y);
    this.velocity.set(120, 0);
    this.energy = 100;
    this.coolDownTime = .5;
    this.moveLeft = this.moveRight = false;
    this.setImage(img[0]);
    this.shield = img[1];
    this.lifeBar = img[2]
    this.shieldTime = Const.SHIELD_TIME;
  }

  shoot(): boolean {
    if (!this.coolDownTime) {
      this.coolDownTime = .2;
      return true;
    }
    return false;
  }

  activateShield() {
    this.shieldTime = Const.SHIELD_TIME;
  }

  reset() {
    this.energy = 100;
    this.coolDownTime = .1;
  }

  update(dt: number) {
    if (this.moveLeft && this.left > 2) this.pos.x -= dt * this.velocity.x;
    if (this.moveRight && this.right < Const.WIDTH - 2) this.pos.x += dt * this.velocity.x;

    if (this.coolDownTime && (this.coolDownTime -= dt) < 0) this.coolDownTime = 0;
    if (this.shieldTime && (this.shieldTime -= dt) < 0) this.shieldTime = 0;

    /*this.shots.forEach((e, idx) => {
      if (e.alive) {
        e.update(dt);
        if (e.pos.x < -this.bullet.width || e.pos.y < -this.bullet.height || e.pos.x > Const.WIDTH || e.pos.y > Const.HEIGHT) {
          this.shots[idx].alive = false;
        }
      }
    });*/

    //this.energy -= dt * 12;
  }

  draw(ctx: CanvasRenderingContext2D) {
    /*this.shots.forEach(e => {
      if (e.alive) {
        this.bullet.pos.set(e.pos.x, e.pos.y);
        this.bullet.draw(ctx);
      }
    });*/

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