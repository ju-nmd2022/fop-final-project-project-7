export class ActiveObject {
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

  draw(spriteX, spriteY, ctx) {
    this.ctx.drawImage(this.image, this.x, this.y);
    // check if the sprite is close to the ActiveObject
    if (this.isInRange(spriteX, spriteY, 80)) {
      // display the popup
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y - 30, 100, 20);
      ctx.fillStyle = "black";
      ctx.font = "10px Courier";
      ctx.fillText("Press spacebar", this.x, this.y - 15);
    }
  }

  isColliding(position) {
    return (
      position.x >= this.x &&
      position.x <= this.x + this.image.width &&
      position.y >= this.y &&
      position.y <= this.y + this.image.height
    );
  }

  isInRange(spriteX, spriteY, threshold) {
    const distanceX = spriteX - this.x;
    const distanceY = spriteY - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < threshold;
  }
}
