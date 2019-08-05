import Keyboard from "./keyboard.js";

export default class State {
  keyboard: Keyboard;

  draw(ctx: CanvasRenderingContext2D) {
    throw new Error("Method not implemented.");
  }
  update(arg0: number) {
    throw new Error("Method not implemented.");
  }
  start() {
    throw new Error("Method not implemented.");
  }

  constructor() {
    this.keyboard = new Keyboard();
  }
}