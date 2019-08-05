import * as Const from "./const.js";
import State from "./state.js";

export default class GameOverState extends State {
  hiScr: number;
  scr: number;

  constructor(arg0: number, arg1: number) {
    super();
    this.hiScr = arg1;
    this.scr = arg0;

    this.keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("stateChange", {
        detail: { state: Const.START }
      }));
    });
  }

  start() { }

  update(dt: number) {
    //
  }

  draw(ctx: CanvasRenderingContext2D) {
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