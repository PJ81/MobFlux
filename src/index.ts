import * as Const from "./const.js";
import Game from "./game.js"
import Sound from "./sound.js";
import Stars from "./stars.js";
import Enemies from "./enemies.js";
import Bonus from "./bonus.js";
import Boss from "./boss.js";
import Player from "./player.js";
import Stones from "./stones.js";
import State from "./state.js";
import GameOverState from "./goState.js";
import StartState from "./startState.js";
import PlayState from "./playState.js";

export { GameObject };

class GameObject {
  sound: Sound;
  player: Player;
  stones: Stones;
  stars: Stars;
  enemies: Enemies;
  bonus: Bonus;
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
          this.state = new GameOverState(this.score, this.hiscore, this.gameObjs);
          break;
        case Const.START:
          this.state = new StartState(this.gameObjs);
          break;
        case Const.PLAY:
          this.state = new PlayState(this.gameObjs);
          this.gameObjs.sound.playLoop(Const.LOOP);
          break;
      }
      this.state.start();
    });

    this.res.loadImages([
      "boss.gif", "bul0.gif", "bul1.gif", "bul2.gif", "bul3.gif", "ene0.gif",
      "ene1.gif", "ene2.gif", "ene3.gif", "ene4.gif", "ene5.gif", "ene6.gif",
      "hero.gif", "rnd0.gif", "rnd1.gif", "stn0.gif", "stn1.gif", "stn2.gif",
      "stn3.gif"
    ], () => {
      this.load();
      this.loop();
    });

    this.update = (dt: number) => { this.state.update(dt); };
    this.draw = () => { this.state.draw(this.ctx); };
  }

  reset() {
    //
  }

  load() {
    this.gameObjs = {
      sound: this.gameObjs.sound = new Sound([
        "../snd/shot.mp3", "../snd/powerup.mp3", "../snd/hitboss.mp3", "../snd/explo0.mp3",
        "../snd/explo1.mp3", "../snd/explo2.mp3", "../snd/dead.mp3", "../snd/bossdead.mp3",
        "../snd/loop.mp3"
      ]),
      player: new Player((Const.WIDTH >> 1), Const.HEIGHT - 26, this.res.images[Const.HERO]),
      stones: new Stones([this.res.images[Const.STN0], this.res.images[Const.STN1], this.res.images[Const.STN2], this.res.images[Const.STN3]]),
      stars: new Stars(),
      enemies: new Enemies(),
      boss: new Boss(),
      bonus: new Bonus([this.res.images[Const.RND0], this.res.images[Const.RND1]])
    };
    this.state = new StartState(this.gameObjs);
  }
}

new Mob();