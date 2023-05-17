export class ActiveObject {
  constructor(x, y, imageSrc, ctx, maxSpacePresses) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = imageSrc;
    this.spacePresses = 0; //number of space presses 
    this.maxSpacePresses = maxSpacePresses; //maximum number of space presses to increase score
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
    //calculate distance between sprite and object
    //following four lines inspired by https://codeguppy.com/blog/how-to-calculate-the-distance-between-two-points-using-javascript-and-p5.js/index.html
    //threshold usage inspired by chatgpt
    const distanceX = spriteX - this.x;
    const distanceY = spriteY - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < threshold;
  }

  increaseSpacePresses() {
    if (this.spacePresses < this.maxSpacePresses) {
      this.spacePresses++;
    }
  }
}
