export default class InitObj {
  img: HTMLImageElement;
  x: number;
  y: number;
  e: any;

  constructor(i: HTMLImageElement, x: number, y: number, e: any = null) {
    this.img = i;
    this.x = x;
    this.y = y;
    this.e = e;
  }
}