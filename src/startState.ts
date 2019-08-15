import * as Const from "./const.js";
import State from "./state.js";
import { GameObject } from "./index.js";

export default class StartState extends State {
  stars: import("./stars.js").default;
  constructor(go: GameObject) {
    super();
    this.stars = go.stars;

    this.keyboard.addKey(32, () => {
      console.log("PLAY -> STATE");
      window.dispatchEvent(new CustomEvent("stateChange", {
        detail: { state: Const.PLAY }
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
    ctx.font = "28px 'Press Start 2P'";
    ctx.fillText(`MOBFLUX`, Const.WIDTH >> 1, Const.HEIGHT * .3);
    ctx.font = "8px 'Press Start 2P'";
    ctx.fillText(`FIRE: SPACE`, Const.WIDTH >> 1, Const.HEIGHT * .45);
    ctx.fillText(`LEFT: A / LEFT`, Const.WIDTH >> 1, Const.HEIGHT * .49);
    ctx.fillText(`RIGHT: D / RIGHT`, Const.WIDTH >> 1, Const.HEIGHT * .53);
    ctx.font = "7px 'Press Start 2P'";
    ctx.fillText(`[FIRE] TO PLAY`, Const.WIDTH >> 1, Const.HEIGHT * .8);
    ctx.font = "5px 'Press Start 2P'";
    ctx.fillText(`PROG/GRFX/SND: PJ81`, Const.WIDTH >> 1, Const.HEIGHT * .96);
    ctx.fillText(`MUSIC: ERIC MATYAS`, Const.WIDTH >> 1, Const.HEIGHT * .98);
  }
}