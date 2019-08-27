import State from "./state.js";
import Stones from "../objects/enemies/stones.js";

export default class StateStn extends State {
  stones: Stones;

  constructor() {
    super();
    this.stones = new Stones();
    this.start = () => this.stones.reset();
    this.update = (dt: number): boolean => { return this.stones.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.stones.draw(ctx);
  }

  getEntities(): any[] {
    return this.stones.stones;
  }
}