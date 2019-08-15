import Point from "./point.js";

export default class Bullet {
  pos: Point;
  alive: boolean;
  vel: Point;

  constructor() {
    this.pos = new Point();
    this.vel = new Point();
    this.alive = false;
  }

  start(x: number, y: number, vx: number, vy: number) {
    this.pos.set(x, y);
    this.vel.set(vx, vy);
    this.alive = true;
  }

  update(dt: number) {
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }
}