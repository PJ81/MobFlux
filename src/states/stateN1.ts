import State from "./state.js";
import WaveA from "../objects/enemies/waveA.js";

export default class StateN1 extends State {
  wave: WaveA;

  constructor() {
    super();
    this.wave = new WaveA();
    this.start = () => { this.addEnemies(5); this.wave.create(); }
    this.update = (dt: number): boolean => { return this.wave.update(dt); }
    this.draw = (ctx: CanvasRenderingContext2D) => this.wave.draw(ctx);
    this.getEntities = (): any[] => { return this.wave.baddies; }
  }

  addEnemies(ec: number) {
    for (let l = this.wave.baddiesCount.length, o = 0; o < l; o++) {
      for (let ol = this.wave.baddiesCount[o].length, oo = 0; oo < ol; oo++) {
        this.wave.baddiesCount[o][oo] += ec;
      }
    }
  }
}