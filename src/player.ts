import * as Const from "./const.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  coolDownTime: number;
  moveLeft: boolean;
  moveRight: boolean;
  shoot: () => number;

  constructor(x: number, y: number, img: HTMLImageElement) {
    super(x, y);
    this.velocity.set(120, 0);
    this.energy = 100;
    this.coolDownTime = .1;
    this.moveLeft = this.moveRight = false;
    this.setImage(img);

    this.shoot = () => this.coolDownTime = .25;
  }

  update(dt: number) {
    if (this.coolDownTime && (this.coolDownTime -= dt) < 0) {
      this.coolDownTime = 0;
    }
    if (this.moveLeft && this.left > 2) this.pos.x -= dt * this.velocity.x;
    if (this.moveRight && this.right < Const.WIDTH - 2) this.pos.x += dt * this.velocity.x;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = "#fff";
    const x = Const.WIDTH / 2 - this.energy / 2,
      y = this.bottom + 6;
    ctx.fillRect(x, y, this.energy, 3);
  }
}