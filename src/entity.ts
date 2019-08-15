import Point from "./point.js";

export default class Entity {
  pos: Point;
  velocity: Point;
  alive: boolean;
  angle: number;
  energy: number;
  turnDir: number;
  width: number;
  height: number;
  frames: HTMLImageElement[];
  animTimer: number;
  animFrame: any;
  hasAnimation: boolean;

  constructor(x: number, y: number) {
    this.pos = new Point(x, y);
    this.velocity = new Point();
    this.hasAnimation = false;
    this.turnDir = 0;
    this.animFrame = 0;
    this.width = 0;
    this.height = 0;
    this.frames = [];
    this.alive = true;
    this.angle;
    this.energy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.frames[this.animFrame], this.left, this.top);
  }

  update(dt: number) {
    if (this.hasAnimation) {
      if ((this.animTimer -= dt) < 0) {
        this.animTimer = .5;
        this.animFrame = (this.animFrame + 1) % this.frames.length;
      }
    }
  }

  setImage(img: HTMLImageElement, idx = -1) {
    if (img) {
      if (idx < 0) {
        this.frames.push(img);
      } else {
        this.frames[idx] = img;
      }

      this.width = img.width;
      this.height = img.height;
    }
  }

  get top(): number {
    return this.pos.y - (this.height >> 1);
  }

  get bottom(): number {
    return this.pos.y + (this.height >> 1);
  }

  get left(): number {
    return this.pos.x - (this.width >> 1);
  }

  get right(): number {
    return this.pos.x + (this.width >> 1);
  }

  get box(): object {
    return {
      l: this.left,
      t: this.top,
      r: this.right,
      b: this.bottom
    }
  }
}