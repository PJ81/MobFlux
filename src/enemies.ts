import Entity from "./entity.js";

class Enemy extends Entity {
  constructor() {
    super(0, 0);
  }

  update(dt: number) {
    //
  }

  draw(ctx: CanvasRenderingContext2D) {
    //
  }

}

export default class Enemies {
  enemies: Enemy[];

  constructor() {
    this.enemies = [];
  }

  update(dt: number) {
    this.enemies.forEach(e => { if (e.alive) e.update(dt); });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.enemies.forEach(e => { if (e.alive) e.draw(ctx); });
  }
}