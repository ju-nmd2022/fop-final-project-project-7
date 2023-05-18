export class ActiveObject {
  constructor(
    x,
    y,
    imageSrc,
    ctx,
    maxSpacePresses,
    successPopupImageSrc,
    failPopupImageSrc,
    popupImageTimeout
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = imageSrc;
    this.spacePresses = 0; //number of space presses to begin with
    this.maxSpacePresses = maxSpacePresses; //maximum number of space presses to increase score
    this.successPopupImageSrc = successPopupImageSrc; //unique popup for each object when task is completed
    this.isSuccessPopupVisible = false;
    this.failPopupImageSrc = failPopupImageSrc; //unique popup for each object when task is failed
    this.isFailPopupVisible = false;
    this.popupImageTimeout = popupImageTimeout;
    this.popupStartTime = null; //timestamp for how long popup is shown

    //preload popup images to avoid flicker - the following lines of code adapted from chatgpt
    // this.successPopupImage = new Image();
    // this.successPopupImage.src = this.successPopupImageSrc;
    // this.failPopupImage = new Image();
    // this.failPopupImage.src = this.failPopupImageSrc;  

  }

  draw(spriteX, spriteY, ctx) {
    this.ctx.drawImage(this.image, this.x, this.y);
    // check if the sprite is close to the ActiveObject
    if (this.isInRange(spriteX, spriteY, 80)) {
      // display the popup
      const spacePopup = new Image();
      spacePopup.src = "game-assets/images/press-space.png";
      ctx.drawImage(spacePopup, this.x, this.y - 30);
    }

    const currentTime = Date.now();
    if (
      this.isSuccessPopupVisible &&
      currentTime - this.popupStartTime < this.popupImageTimeout
    ) {
      const successPopupImage = new Image();
      successPopupImage.onload = () => {
        ctx.drawImage(successPopupImage, 120, 150);
      };
      successPopupImage.src = this.successPopupImageSrc;
    } else {
      this.isSuccessPopupVisible = false; //hide popup when time runs out
    }

    if (
      this.isFailPopupVisible &&
      currentTime - this.popupStartTime < this.popupImageTimeout
    ) {
      const failPopupImage = new Image();
      failPopupImage.onload = () => {
        ctx.drawImage(failPopupImage, 120, 150);
      };
      failPopupImage.src = this.failPopupImageSrc;
    } else {
      this.isFailPopupVisible = false;
    }
  }

  isColliding(newSpriteX, newSpriteY) {
    return (
      // position.x >= this.x &&
      // position.x <= this.x + this.image.width &&
      // position.y >= this.y &&
      // position.y <= this.y + this.image.height
      newSpriteX < this.x + this.width &&
    newSpriteX + spriteSheet.width > this.x &&
    newSpriteY < this.y + this.height &&
    newSpriteY + spriteSheet.height > this.y
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

  increaseSpacePresses(currentTime) {
    if (this.spacePresses < this.maxSpacePresses) {
      this.spacePresses++;
      this.isSuccessPopupVisible = true;
      this.popupStartTime = currentTime;
      if (this.spacePresses === this.maxSpacePresses) {
        this.isSuccessPopupVisible = false;
        this.successPopupVisible = true;
        this.popupStartTime = currentTime;
      }
    } else {
      if (this.isSuccessPopupVisible) {
        this.isSuccessPopupVisible = false;
      }
      this.isFailPopupVisible = true;
      this.popupStartTime = currentTime;
    }
  }
}
