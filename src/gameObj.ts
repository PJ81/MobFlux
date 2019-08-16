import Sound from "./sound.js";
import Player from "./player.js";
import Stones from "./stones.js";
import Stars from "./stars.js";
import Enemies from "./enemies.js";
import Powerup from "./power.js";
import Boss from "./boss.js";
import Keyboard from "./keyboard.js";

export default class GameObject {
  sound: Sound;
  player: Player;
  stones: Stones;
  stars: Stars;
  enemies: Enemies;
  bonus: Powerup;
  boss: Boss;
  keyboard: Keyboard;

  constructor() {
    this.keyboard;
    this.sound;
    this.player;
    this.stones;
    this.stars;
    this.enemies;
    this.boss;
  }
}