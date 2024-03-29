import State from "./state.js";
import WaveB from "../objects/enemies/waveB.js";

export default class StateN2 extends State {
  wave: WaveB;

  constructor() {
    super();
    this.wave = new WaveB();
    this.start = () => { this.wave.create(); }
    this.update = (dt: number): boolean => { return this.wave.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.wave.draw(ctx);
    this.getEntities = (): any[] => { return this.wave.baddies; }
  }
}