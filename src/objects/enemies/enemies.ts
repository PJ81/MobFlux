import State from "../../states/state.js";
import StateN1 from "../../states/stateN1.js";
import StateN2 from "../../states/stateN2.js";
import StateN3 from "../../states/stateN3.js";
import StateStn from "../../states/stateStn.js";
import StateBoss from "../../states/stateBoss.js";
import Entity from "../../core/entity.js";

export default class Enemies {
  state: State;
  stateN1: StateN1;
  stateN2: StateN2;
  stateN3: StateN3;
  stateStn: StateStn;
  stateBoss: StateBoss;
  states: State[];
  stateID: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  setState: (s: number) => void;

  constructor() {
    this.draw = (ctx: CanvasRenderingContext2D) => this.state.draw(ctx);
    this.setState = (s: number) => {
      this.stateID = s;
      this.state = this.states[this.stateID];
      this.state.start();
    };

    this.states = [new StateN1(), new StateN2, new StateN3(), new StateStn(), new StateBoss()];
    this.stateID;
    this.setState(3);
  }

  getEnemies(): Entity[] {
    return this.state.getEntities();
  }

  update(dt: number) {
    if (this.state.update(dt)) return;

    switch (this.stateID) {
      case 0://n1
        this.setState(1);
        break;
      case 1://n2
        this.setState(2);
        break;
      case 2://n3
        this.setState(3);
        break;
      case 3://stones
        this.setState(4);
        break;
      case 4://boss
        this.setState(0);
        break;
    }
  }
}