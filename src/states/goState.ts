import * as Const from "../core/const.js";
import State from "./state.js";

export default class GameOverState extends State {
  hiScr: number;
  scr: number;

  constructor(arg0: number, arg1: number) {
    super();
    this.hiScr = arg1;
    this.scr = arg0;
  }

  start() { }

  update(dt: number): boolean {
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText(`BEST SCORE`, Const.WIDTH >> 1, Const.HEIGHT * .3);
    ctx.fillText(`YOUR SCORE`, Const.WIDTH >> 1, Const.HEIGHT * .6);
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText(`${this.hiScr}`, Const.WIDTH >> 1, Const.HEIGHT * .36);
    ctx.fillText(`${this.scr}`, Const.WIDTH >> 1, Const.HEIGHT * .66);
    ctx.font = "7px 'Press Start 2P'";
    ctx.fillText(`[SPACE] TO START`, Const.WIDTH >> 1, Const.HEIGHT * .85);
  }
}