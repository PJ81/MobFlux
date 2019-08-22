import * as Const from "../core/const.js";
import State from "./state.js";
import Sound from "../core/sound.js";
import Player from "../objects/player.js";
import Enemies from "../enemies/enemies.js";
import Powerups from "../objects/powerup.js";
import Bullet from "../objects/bullet.js";
import { R, K, B, S, P } from "../core/gameObj.js";

export default class PlayState extends State {
  sound: Sound;
  player: Player;
  powerup: Powerups;
  enemies: Enemies;

  constructor() {
    super();
    this.player = new Player(0, 0, [R.images[Const.HERO], R.images[Const.SHLD], R.images[Const.LIFE]]);
    this.enemies = new Enemies();
    this.powerup = new Powerups();

    B.setImages([R.images[Const.BLT0], R.images[Const.BLT1], R.images[Const.BLT2], R.images[Const.BLT3]]);
    B.reset();

    K.clear();
    K.addKey(65, (k: number) => this.player.moveLeft = k === Const.PRESSED);
    K.addKey(37, (k: number) => this.player.moveLeft = k === Const.PRESSED);
    K.addKey(68, (k: number) => this.player.moveRight = k === Const.PRESSED);
    K.addKey(39, (k: number) => this.player.moveRight = k === Const.PRESSED);
    K.addKey(17, () => {
      if (this.player.shoot()) {
        B.start(this.player.pos.x, this.player.top, this.player.bulletType);
        S.play(0);
      }
    });
  }

  start() {
    const x = (Const.WIDTH >> 1);
    this.player.pos.set(x, Const.HEIGHT - 30);
  }

  update(dt: number): boolean {
    B.update(dt);
    P.update(dt);
    this.player.update(dt);
    this.enemies.update(dt);
    this.powerup.update(dt);

    this.checkCollisions();
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    B.draw(ctx);
    P.draw(ctx);
    this.powerup.draw(ctx);
    this.enemies.draw(ctx);
    this.player.draw(ctx);
  }

  decPlayerEnergy(e: number) {
    if (this.player.shieldTimer > 0) return;

    this.player.energy -= e;
    if (this.player.energy <= 0) {
      window.dispatchEvent(new CustomEvent("stateChange", {
        detail: {
          state: Const.GAMEOVER,
          score: this.player.score
        },
      }));
    }
  }

  checkCollisions() {
    function collideBox(a: any, b: any) {
      return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
    }

    const plBx = this.player.box;
    const en = this.enemies.getEnemies().filter(e => e.alive);
    const pb = B.bullets.filter(e => e.type < 3 && e.alive);
    en.concat(B.bullets.filter(e => e.type > 2 && e.alive));

    for (const b of pb) {
      nextE:
      for (const e of en) {
        if (b.alive && e.alive && collideBox(b.box, e.box)) {
          e.alive = false;
          b.alive = false;
          this.player.score += e.score;

          if (!(e instanceof Bullet) && Math.random() < .9) {
            this.powerup.start(e.pos.x, e.pos.y);
          }
          break nextE;
        }
      }
    }

    const pow = this.powerup.powerups.filter(e => e.alive);
    for (const e of pow) {
      if (collideBox(plBx, e.box)) {
        e.alive = false;
        switch (e.type) {
          case 0:
            this.player.setWeapon(e.score);
            break;
          case 1:
            this.player.activateShield(e.score);
            break;
          case 2:
            this.player.energy = Math.min(100, this.player.energy + e.score);
            break;
          case 3: break;
        }
      }
    }

    const st = this.enemies.getEnemies().filter(e => e.alive);
    for (const e of st) {
      if (collideBox(plBx, e.box)) {
        e.alive = false;
        this.decPlayerEnergy(e.hitScore);
      }
    }
  }
}