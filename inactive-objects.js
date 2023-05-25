export class InactiveObject {
  constructor(x, y, imageSrc, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = imageSrc;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y);
  }
  
  isColliding(position) {
    return (
      position.x >= this.x &&
      position.x <= this.x + this.width &&
      position.y >= this.y &&
      position.y <= this.y + this.height
    );
  }
}
