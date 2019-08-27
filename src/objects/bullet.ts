import Entity from "../core/entity.js";
import { P } from "../core/gameObj.js";
import InitObj from "./initBltObj.js";

export default class Bullet extends Entity {
  init(o: InitObj) {
    throw new Error("Method not implemented.");
  }

  update(dt: number) {
    throw new Error("Method not implemented.");
  }

  partTime: number;
  partTimer: number;
  startParticle: (x: number, y: number, s: number, c: string) => void;

  constructor() {
    super(0, 0);
    this.alive = false;
    this.angle = 0;
    this.startParticle = (x: number, y: number, s: number, c: string) => P.addParticle(x, y, s, c);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}