import Keyboard from "./keyboard.js";
import Sound from "./sound.js";
import Particles from "./particles.js";
import Resource from "./resources.js";
import Bullets from "../objects/bullets.js";

export const
  K = new Keyboard(),
  R = new Resource(),
  P = new Particles(),
  B = new Bullets(),
  S = new Sound([
    "../snd/shot.mp3", "../snd/powerup.mp3", "../snd/hitboss.mp3",
    "../snd/explo0.mp3", "../snd/explo1.mp3", "../snd/explo2.mp3",
    "../snd/dead.mp3", "../snd/bossdead.mp3", "../snd/loop.mp3"
  ]);