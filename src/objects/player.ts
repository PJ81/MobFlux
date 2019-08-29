import * as Const from "../core/const.js";
import Entity from "../core/entity.js";
import { P } from "../core/gameObj.js";


export default class Player extends Entity {
  coolDownTime: number;
  shieldTimer: number;
  startShieldTimer: number;
  coolDownTimeR: number;
  weaponTimer: number;
  weaponType: number;
  partTimer: number;
  moveLeft: boolean;
  moveRight: boolean;
  shield: HTMLImageElement;
  lifeBar: HTMLImageElement;
  activateShield: (t: number) => number;

  constructor(img: HTMLImageElement[]) {
    super();
    this.activateShield = (t: number) => this.startShieldTimer = this.shieldTimer = t;

    this.velocity.set(120, 0);
    this.energy = 100;
    this.coolDownTimeR = .2;
    this.coolDownTime = this.coolDownTimeR
    this.moveLeft = this.moveRight = false;
    this.setImage(img[0]);
    this.shield = img[1];
    this.lifeBar = img[2]
    this.startShieldTimer;
    this.shieldTimer;
    this.activateShield(10);
    this.weaponType;
    this.partTimer;
    this.weaponTimer;
    this.setWeapon(0);
  }

  shoot(): boolean {
    if (!this.coolDownTime) {
      this.coolDownTime = this.coolDownTimeR;
      return true;
    }
    return false;
  }

  setWeapon(w: number) {
    this.weaponType = w;
    switch (w) {
      case 0:
        this.coolDownTime = this.coolDownTimeR = .2;
        this.weaponTimer = 0;
        break;
      case 1:
        this.coolDownTime = this.coolDownTimeR = .35;
        this.weaponTimer = 8;
        break;
      case 2:
        this.coolDownTime = this.coolDownTimeR = .6;
        this.weaponTimer = 12;
        break;
    }
  }

  reset() {
    this.energy = 100;
    this.setWeapon(0);
  }

  update(dt: number) {
    if (this.moveLeft && this.left > 2) this.pos.x -= dt * this.velocity.x;
    if (this.moveRight && this.right < Const.WIDTH - 2) this.pos.x += dt * this.velocity.x;

    if (this.coolDownTime && (this.coolDownTime -= dt) < 0) this.coolDownTime = 0;
    if (this.shieldTimer && (this.shieldTimer -= dt) < 0) this.shieldTimer = 0;
    if (this.weaponTimer && (this.weaponTimer -= dt) < 0) {
      this.setWeapon(0);
    }

    if ((this.partTimer -= dt) < 0) {
      this.partTimer = .025;
      P.addParticle(Const.RND(this.pos.x - 1, this.pos.x + 1), this.bottom + 2, Const.RND(2, 4), "rgba(255,255,255,", Math.random() < .5 ? -1 : 1, Const.RND(30, 35));
      P.addParticle(Const.RND(this.pos.x - 1, this.pos.x + 1), this.bottom + 3, Const.RND(2, 4), "rgba(200,200,5,", Math.random() < .5 ? -1 : 1, Const.RND(40, 60));
      P.addParticle(Const.RND(this.pos.x - 2, this.pos.x + 2), this.bottom + 3, Const.RND(2, 4), "rgba(190,150,5,", Math.random() < .5 ? -1 : 1, Const.RND(60, 100));
      P.addParticle(Const.RND(this.pos.x - 2, this.pos.x + 2), this.bottom + 4, Const.RND(2, 4), "rgba(200,120,5,", Math.random() < .5 ? -1 : 1, Const.RND(60, 100));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);

    if (this.shieldTimer > 0) {
      ctx.globalAlpha = 1 / this.startShieldTimer * this.shieldTimer;
      ctx.drawImage(this.shield, this.left - 9, this.top - 9);
      ctx.globalAlpha = 1;
    }
    const dx = this.energy * this.lifeBar.width / 100;
    ctx.drawImage(this.lifeBar, 0, 0, dx, 4, 3, 3, dx, 4);
  }
}