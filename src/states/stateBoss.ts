import State from "./state.js";

export default class StateBoss extends State {
  constructor() {
    super();
  }

  start() {
    //
  }

  update(dt: number): boolean {
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    //
  }

  getEntities(): any[] {
    return [];
  }
}