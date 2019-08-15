import * as Const from "./const.js";
import Game from "./game.js"
import Sound from "./sound.js";
import Stars from "./stars.js";
import Enemies from "./enemies.js";
import Boss from "./boss.js";
import Player from "./player.js";
import Stones from "./stones.js";
import State from "./state.js";
import GameOverState from "./goState.js";
import StartState from "./startState.js";
import PlayState from "./playState.js";
import Powerup from "./power.js";

export { GameObject };

class GameObject {
  sound: Sound;
  player: Player;
  stones: Stones;
  stars: Stars;
  enemies: Enemies;
  bonus: Powerup;
  boss: Boss;

  constructor() {
    this.sound;
    this.player;
    this.stones;
    this.stars;
    this.enemies;
    this.boss;
  }
}

class Mob extends Game {
  state: State;
  goState: GameOverState;
  plState: PlayState;
  stState: StartState;
  score: number;
  hiscore: number;
  gameObjs: GameObject;

  constructor() {
    super();

    this.state;
    this.gameObjs = new GameObject();
    this.score = 0;
    this.hiscore = 0;

    window.addEventListener("stateChange", (e: any) => {
      switch (e.detail.state) {
        case Const.GAMEOVER:
          this.state = this.goState;
          break;
        case Const.START:
          this.reset();
          this.state = this.stState;
          break;
        case Const.PLAY:
          this.state = this.plState;
          this.gameObjs.sound.setVolume(Const.LOOP, .8);
          this.gameObjs.sound.playLoop(Const.LOOP);
          break;
      }
      this.state.start();
    });

    this.res.loadImages([
      "boss.gif", "bul0.gif", "bul1.gif", "sht0.gif", "sht1.gif", "enm0.gif",
      "enm1.gif", "enm2.gif", "enm3.gif", "pow0.gif", "pow1.gif", "pow2.gif",
      "pow3.gif", "hero.gif", "shld.png", "stn0.gif", "stn1.gif", "stn2.gif",
      "stn3.gif", "back.jpg", "life.png"
    ], () => {
      this.load();
      this.loop();
    });

    this.update = (dt: number) => { this.state.update(dt); };
    this.draw = () => {
      this.ctx.drawImage(this.res.images[Const.BACK], 0, 0);
      this.state.draw(this.ctx);
    };
  }

  reset() {
    this.gameObjs.player.reset();
  }

  load() {
    this.gameObjs = {
      sound: this.gameObjs.sound = new Sound([
        "../snd/shot.mp3", "../snd/powerup.mp3", "../snd/hitboss.mp3", "../snd/explo0.mp3",
        "../snd/explo1.mp3", "../snd/explo2.mp3", "../snd/dead.mp3", "../snd/bossdead.mp3",
        "../snd/loop.mp3"
      ]),
      player: new Player((Const.WIDTH >> 1), Const.HEIGHT - 50, [this.res.images[Const.HERO], this.res.images[Const.SHLD], this.res.images[Const.SHT0], this.res.images[Const.LIFE]]),
      stones: new Stones([this.res.images[Const.STN0], this.res.images[Const.STN1], this.res.images[Const.STN2], this.res.images[Const.STN3]]),
      stars: new Stars(),
      enemies: new Enemies(),
      boss: new Boss(),
      bonus: new Powerup([this.res.images[Const.POW0], this.res.images[Const.POW1], this.res.images[Const.POW2], this.res.images[Const.POW3]])
    };

    this.goState = new GameOverState(this.score, this.hiscore, this.gameObjs);
    this.plState = new PlayState(this.gameObjs);
    this.stState = new StartState(this.gameObjs);

    this.state = this.stState;
  }
}

new Mob();