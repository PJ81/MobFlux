import * as Const from './core/const.js';
import Game from "./core/game.js";
import State from "./states/state.js";
import GameOverState from './states/goState.js';
import StartState from './states/startState.js';
import PlayState from './states/playState.js';
import Stars from './objects/stars.js';
import { R, K, S } from './core/gameObj.js';


class Mob extends Game {
  bgPosY: number;
  state: State;
  stars: Stars;

  constructor() {
    super();
    this.bgPosY = 0;
    this.state;
    this.stars = new Stars();

    window.addEventListener("stateChange", (e: any) => {
      switch (e.detail.state) {
        case Const.GAMEOVER:
          K.clear();
          K.addKey(32, () => {
            window.dispatchEvent(new CustomEvent("stateChange", {
              detail: { state: Const.START }
            }));
          });
          this.state = new GameOverState(0, 0);
          break;
        case Const.START:
          this.reset();
          K.clear();
          K.addKey(17, () => {
            window.dispatchEvent(new CustomEvent("stateChange", {
              detail: { state: Const.PLAY }
            }));
          });
          this.state = new StartState();
          break;
        case Const.PLAY:
          S.setVolume(Const.LOOP, .8);
          S.playLoop(Const.LOOP);
          this.state = new PlayState();
          break;
      }
      this.state.start();
    });

    R.loadImages([
      "boss.gif", "bul0.gif", "bul1.gif", "bul2.gif", "bul3.gif", "enm0.gif",
      "enm1.gif", "enm2.gif", "enm3.gif", "pow0.gif", "pow1.gif", "pow2.gif",
      "pow3.gif", "hero.gif", "shld.png", "stn0.gif", "stn1.gif", "stn2.gif",
      "stn3.gif", "back.png", "life.png"
    ], () => {
      this.load();
      this.loop();
    });

    this.update = (dt: number) => {
      this.stars.update(dt);
      this.state.update(dt);

      if ((this.bgPosY += dt * 10) >= Const.HEIGHT) this.bgPosY = 0;
    };
    this.draw = () => {
      const img = R.images[Const.BACK];
      const y = Const.HEIGHT - this.bgPosY;
      this.ctx.clearRect(0, 0, Const.WIDTH, Const.HEIGHT)
      this.ctx.drawImage(img, 0, 0, Const.WIDTH, y, 0, this.bgPosY, Const.WIDTH, y);
      this.ctx.drawImage(img, 0, y, Const.WIDTH, this.bgPosY, 0, 0, Const.WIDTH, this.bgPosY);
      this.stars.draw(this.ctx);
      this.state.draw(this.ctx);
    };
  }

  reset() {
    //
  }

  load() {
    //
  }
}

// entry point
new Mob();
window.dispatchEvent(new CustomEvent("stateChange", {
  detail: { state: Const.START }
}));