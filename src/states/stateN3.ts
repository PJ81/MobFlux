import State from "./state.js";
import WaveC from "../objects/enemies/waveC.js";

export default class StateN3 extends State {
  wave: WaveC;

  constructor() {
    super();
    this.wave = new WaveC();
    this.start = () => { this.wave.create(); }
    this.update = (dt: number): boolean => { return this.wave.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.wave.draw(ctx);
    this.getEntities = (): any[] => { return this.wave.baddies; }
  }
}