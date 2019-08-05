import * as Const from "./const.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  coolDownTime: number;
  move: (d: number) => void;
  shoot: () => number;

  constructor(x: number, y: number, img: HTMLImageElement) {
    super(x, y);
    this.velocity.set(120, 0);
    this.energy = 100;
    this.coolDownTime = .1;
    this.setImage(img);
    this.move = (d: number) => this.direction = d;
    this.shoot = () => this.coolDownTime = .25;
  }

  update(dt: number) {
    if (this.coolDownTime && (this.coolDownTime -= dt) < 0) {
      this.coolDownTime = 0;
    }

    this.pos.x += this.velocity.x * this.direction * dt;
    if (this.left < 0) {
      this.pos.x = this.width >> 1;
    } else if (this.right > Const.WIDTH - 2) {
      this.pos.x = Const.WIDTH - (this.width >> 1) - 2;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.left | 0, this.top);
    ctx.fillStyle = "#fff";
    const x = Const.WIDTH / 2 - this.energy / 2,
      y = this.bottom + 6;
    ctx.fillRect(x, y, this.energy, 3);
  }
}