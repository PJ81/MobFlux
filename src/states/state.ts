import Entity from "../core/entity.js";

export default class State {
  draw(ctx: CanvasRenderingContext2D) {
    throw new Error("Method not implemented.");
  }
  update(arg0: number): boolean {
    throw new Error("Method not implemented.");
  }
  start() {
    throw new Error("Method not implemented.");
  }
  getEntities(): Entity[] {
    throw new Error("Method not implemented.");
  }
}