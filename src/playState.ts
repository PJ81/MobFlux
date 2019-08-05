import * as Const from "./const.js";
import State from "./state.js";
import { GameObject } from "./index.js";

export default class PlayState extends State {
  gameObj: GameObject;
  dir: number;

  constructor(go: GameObject) {
    super();
    this.gameObj = go;
    this.dir = 0;

    this.keyboard.addKey(65, (k: number) => this.dir = k === Const.PRESSED ? -1 : 0);
    this.keyboard.addKey(37, (k: number) => this.dir = k === Const.PRESSED ? -1 : 0);
    this.keyboard.addKey(68, (k: number) => this.dir = k === Const.PRESSED ? 1 : 0);
    this.keyboard.addKey(39, (k: number) => this.dir = k === Const.PRESSED ? 1 : 0);
    this.keyboard.addKey(32, () => { this.shoot() });
  }

  start() { }

  update(dt: number) {
    this.gameObj.player.move(this.dir);
    this.gameObj.player.update(dt);
    this.gameObj.stars.update(dt);
    this.gameObj.stones.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.gameObj.stars.draw(ctx);
    this.gameObj.stones.draw(ctx);
    this.gameObj.player.draw(ctx);
  }

  shoot() {
    this.gameObj.sound.play(Const.SHOT)
    this.gameObj.player.shoot();
  }
}