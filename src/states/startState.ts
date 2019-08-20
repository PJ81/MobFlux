import * as Const from "../core/const.js";
import State from "./state.js";


export default class StartState extends State {
  angX: number;
  angY: number;

  constructor() {
    super();
    this.angX = 0;
    this.angY = 0;
  }

  start() { }

  update(dt: number): boolean {
    if ((this.angX += dt) > Const.TWO_PI) this.angX = 0;
    if ((this.angY += dt * 2) > Const.TWO_PI) this.angY = 0;
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "28px 'Press Start 2P'";

    const a = 2 + Math.cos(this.angX) * 20,
      b = -Math.sin(this.angY) * 10;

    ctx.fillText(`MOBFLUX`, (Const.WIDTH >> 1) + a, (Const.HEIGHT * .3) + b);
    ctx.font = "8px 'Press Start 2P'";
    ctx.fillText(`FIRE: CTRL`, (Const.WIDTH >> 1) - a, Const.HEIGHT * .45);
    ctx.fillText(`LEFT: A / LEFT`, (Const.WIDTH >> 1) + a, Const.HEIGHT * .49);
    ctx.fillText(`RIGHT: D / RIGHT`, (Const.WIDTH >> 1) - a, Const.HEIGHT * .53);
    ctx.font = "7px 'Press Start 2P'";
    ctx.fillText(`[FIRE] TO PLAY`, (Const.WIDTH >> 1) + a, Const.HEIGHT * .8);
    ctx.font = "5px 'Press Start 2P'";
    ctx.fillText(`PROG/GRFX/SND: PJ81`, (Const.WIDTH >> 1) - a, Const.HEIGHT * .96);
    ctx.fillText(`MUSIC: ERIC MATYAS`, (Const.WIDTH >> 1) + a, Const.HEIGHT * .98);
  }
}