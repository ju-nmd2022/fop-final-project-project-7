export class InactiveObject {
  constructor(x, y, imageSrc, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.image = new Image();
    this.image.onload = () => {
      console.log("apple");
      this.draw();
    };
    this.image.src = imageSrc;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y);
  }
}
