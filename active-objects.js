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
    // Check if the sprite is close to the ActiveObject
  if (this.isInRange(spriteX, spriteY, 100)) {
    // Display the popup
    ctx.fillStyle = "white";
    ctx.fillRect(this.x + 20, this.y - 30, 100, 20);
    ctx.fillStyle = "black";
    ctx.fillText("Press spacebar", this.x + 25, this.y - 15);
  }
  }

  isColliding(position) {
    return (
      position.x >= this.x &&
      position.x <= this.x + this.width &&
      position.y >= this.y &&
      position.y <= this.y + this.height
    );
  }

  isInRange(spriteX, spriteY, threshold) {
    const dx = spriteX - this.x;
    const dy = spriteY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < threshold;
  }
}
