import State from "./state.js";
import WaveD from "../objects/enemies/waveD.js";

export default class StateN4 extends State {
  wave: WaveD;

  constructor() {
    super();
    this.wave = new WaveD();
    this.start = () => { this.wave.create(); }
    this.update = (dt: number): boolean => { return this.wave.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.wave.draw(ctx);
    this.getEntities = (): any[] => { return this.wave.baddies; }
  }
}