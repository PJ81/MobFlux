import Point from "./point.js";

export default class Entity {
  pos: Point;
  velocity: Point;
  alive: boolean;
  angle: number;
  energy: number;
  direction: number;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor(x: number, y: number) {
    this.pos = new Point(x, y);
    this.velocity = new Point();
    this.direction = 0;
    this.width = 0;
    this.height = 0;
    this.image = null;
    this.alive = true;
    this.angle;
    this.energy;
  }

  setImage(img: HTMLImageElement) {
    this.image = img;
    if (img) {
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