import State from "./state.js";

export default class StateBoss extends State {
  constructor() {
    super();
    this.start = () => { }
    this.update = (dt: number): boolean => { return true; }
    this.draw = (ctx: CanvasRenderingContext2D) => { }
    this.getEntities = (): any[] => { return []; }
  }
}