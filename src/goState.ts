import * as Const from "./const.js";
import State from "./state.js";
import { GameObject } from "./index.js";

export default class GameOverState extends State {
  hiScr: number;
  scr: number;
  stars: import("./stars.js").default;

  constructor(arg0: number, arg1: number, go: GameObject) {
    super();
    this.hiScr = arg1;
    this.scr = arg0;
    this.stars = go.stars;

    this.keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("stateChange", {
        detail: { state: Const.START }
      }));
    });
  }

  start() { }

  update(dt: number) {
    this.stars.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.stars.draw(ctx);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px 'Press Start 2P'";
    ctx.fillText(`BEST`, Const.WIDTH >> 1, Const.HEIGHT * .3);
    ctx.fillText(`YOURS`, Const.WIDTH >> 1, Const.HEIGHT * .6);
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(`${this.hiScr}`, Const.WIDTH >> 1, Const.HEIGHT * .4);
    ctx.fillText(`${this.scr}`, Const.WIDTH >> 1, Const.HEIGHT * .7);
    ctx.font = "8px 'Press Start 2P'";
    ctx.fillText(`[SPACE] TO START`, Const.WIDTH >> 1, Const.HEIGHT * .8);
  }
}