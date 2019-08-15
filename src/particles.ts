import Entity from "./entity.js";

class Particle extends Entity {
  constructor(x: number, y: number) {
    super(x, y);
  }
}

class ParticleSystem {
  particles: Particle[];
  alive: boolean;

  constructor() {
    this.particles = [];
    this.alive = false;
  }

  update(dt: number) {
    this.particles.forEach(e => { if (e.alive) e.update(dt) });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(e => { if (e.alive) e.draw(ctx) });
  }
}

export default class ParticleManager {
  particles: ParticleSystem[];

  constructor() {
    this.particles = [];
  }

  update(dt: number) {
    this.particles.forEach(e => { if (e.alive) e.update(dt) });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(e => { if (e.alive) e.draw(ctx) });
  }

  startParticle(x: number, y: number, what: number) {
    switch (what) {
      //
    }
  }
}