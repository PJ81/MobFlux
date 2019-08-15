import * as Const from "./const.js";
import State from "./state.js";
import { GameObject } from "./index.js";

export default class PlayState extends State {
  gameObj: GameObject;
  lifeBar: HTMLImageElement;

  constructor(go: GameObject) {
    super();
    this.gameObj = go;

    this.keyboard.addKey(65, (k: number) => this.gameObj.player.moveLeft = k === Const.PRESSED);
    this.keyboard.addKey(37, (k: number) => this.gameObj.player.moveLeft = k === Const.PRESSED);
    this.keyboard.addKey(68, (k: number) => this.gameObj.player.moveRight = k === Const.PRESSED);
    this.keyboard.addKey(39, (k: number) => this.gameObj.player.moveRight = k === Const.PRESSED);
    this.keyboard.addKey(32, () => {
      console.log("SHOOT");
      if (this.gameObj.player.shoot()) this.gameObj.sound.play(Const.SHOT)
    });
  }

  start() { }

  update(dt: number) {
    this.gameObj.player.update(dt);
    this.gameObj.stars.update(dt);

    if (!this.gameObj.stones.update(dt)) {
      this.gameObj.stones.reset();
    }

    if (this.gameObj.bonus.alive) {
      this.gameObj.bonus.update(dt);
    } else if (Math.random() < .5) {
      const x = Math.random() * ((Const.WIDTH - this.gameObj.bonus.width) + (this.gameObj.bonus.width >> 1));
      this.gameObj.bonus.start(x, -30);
    }

    if (this.gameObj.player.energy <= 0) {
      window.dispatchEvent(new CustomEvent("stateChange", {
        detail: { state: Const.GAMEOVER }
      }));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.gameObj.stars.draw(ctx);
    this.gameObj.stones.draw(ctx);
    this.gameObj.bonus.alive && this.gameObj.bonus.draw(ctx);
    this.gameObj.player.draw(ctx);
  }
}