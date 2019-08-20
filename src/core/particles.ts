import Point from "./point.js";

class Particle {
  pos: Point;
  alpha: number;
  color: string;
  size: number;
  alive: boolean;

  constructor() {
    this.alive = false;
    this.size;
    this.color;
    this.alpha;
    this.pos = new Point();
  }

  set(x: number, y: number, s: number, clr: string) {
    this.pos.set(x, y);
    this.color = clr;
    this.alpha = 1;
    this.size = s;
    this.alive = true;
  }

  update(dt: number) {
    this.alpha -= dt * 5;
    if (this.alpha <= 0) {
      this.alive = false;
      return;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `${this.color}${this.alpha})`;
    const s = this.size >> 1;
    ctx.fillRect(this.pos.x - s, this.pos.y - s, this.size, this.size);
  }
}


export default class Particles {
  particles: Particle[];

  constructor() {
    this.particles = [];
    for (let z = 0; z < 150; z++) {
      this.particles.push(new Particle());
    }
  }

  addParticle(x: number, y: number, s: number, clr: string) {
    const prt = this.getOneParticle();
    if (!prt) return;
    prt.set(x, y, s, clr);
  }

  update(dt: number) {
    this.particles.forEach(e => { if (e.alive) e.update(dt) });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(e => { if (e.alive) e.draw(ctx) });
  }

  private getOneParticle() {
    for (const p of this.particles) {
      if (!p.alive) return p;
    }
    return null;
  }
}

