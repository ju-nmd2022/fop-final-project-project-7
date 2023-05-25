export class ActiveObject {
  //exported to game.js
  constructor(
    x, //position
    y, //position
    imageSrc, //source of image that is drawn
    ctx, //represents 2D rendering context + allows drawing operations to be performed
    maxSpacePresses, //set number of max times the user can press space
    successPopupImageSrc, //source of the success popup image
    failPopupImageSrc, //source of the fail popup image
    popupImageTimeout //the time it takes for the popup image to appear and disappear
  ) {
    // constructor function for the ActiveObject class
    // it is executed when an instance of ActiveObject is created
    // it takes several parameters to initialize the object's properties

    // initialize the position (x, y) of the ActiveObject
    this.x = x;
    this.y = y;

    // store the rendering context (ctx) for drawing operations
    // serves as an interface between JS code and the canvas element in the DOM
    this.ctx = ctx;

    // create a new Image object for the ActiveObject's image
    this.image = new Image();

    // define callback function that is executed when the image is loaded
    // in this callback, the ActiveObject is drawn to the canvas
    // ensures that the image is drawn onto the canvas only after it has been fully loaded
    // and is ready to be displayed
    this.image.onload = () => {
      this.draw();
    };

    // set the source (imageSrc) of the ActiveObject's image
    this.image.src = imageSrc;

    // initialize the number of space presses to 0 in the beginning
    this.spacePresses = 0;

    // set the maximum number of space presses (maxSpacePresses) to increase the score
    this.maxSpacePresses = maxSpacePresses;

    // create a new Image object for the success popup image
    this.successPopupImage = new Image();

    // set the source (successPopupImageSrc) of the success popup image
    this.successPopupImage.src = successPopupImageSrc;

    // sets the flag for displaying the success popup to false
    this.isSuccessPopupVisible = false;

    // create a new Image object for the fail popup image
    this.failPopupImage = new Image();

    // set the source (failPopupImageSrc) of the fail popup image
    this.failPopupImage.src = failPopupImageSrc;

    // sets the flag for displaying the fail popup to false
    this.isFailPopupVisible = false;

    // set the timeout (popupImageTimeout) for displaying the popup image
    this.popupImageTimeout = popupImageTimeout;

    // initialize the start time for the popup to null (absence of value)
    // indicates no popup is shown when the ActiveObject is initially created,
    // only after the sprite interacts with it
    this.popupStartTime = null;
  }

  draw(spriteX, spriteY, ctx) {
    // drawing the ActiveObject

    // draw the ActiveObject's image on the canvas at its current position (x, y)
    this.ctx.drawImage(this.image, this.x, this.y);

    // check if the sprite (character) is close to the ActiveObject
    // if it is within a certain threshold (80 in this case),
    // display a popup image above the ActiveObject

    if (this.isInRange(spriteX, spriteY, 80)) {
      // create a new Image object for the space press popup image
      const spacePopup = new Image();

      // sets the source/object of the space press popup image
      spacePopup.src = "game-assets/images/press-space.png"; //transparent png

      // draw the space press popup image on the canvas just above the ActiveObject in a fixed position
      ctx.drawImage(spacePopup, this.x, this.y - 30);
    }
  }

  // drawing the success and fail popups
  drawPopups(ctx, currentTime) {
    //currentTime parameter compares with the popup start time/timeout
    // and determines whether the timeout for displaying the popups has expired or not

    // check if the success popup is visible and the timeout has not expired
    if (
      this.isSuccessPopupVisible &&
      currentTime - this.popupStartTime < this.popupImageTimeout
    ) {
      // draw the success popup image on the canvas at a fixed position
      ctx.drawImage(this.successPopupImage, 120, 150);
    } else {
      // hide the success popup when the timeout has expired
      this.isSuccessPopupVisible = false;
    }

    // check if the fail popup is visible and the timeout has not expired
    if (
      this.isFailPopupVisible &&
      currentTime - this.popupStartTime < this.popupImageTimeout
    ) {
      // draws the fail popup image on the canvas at a fixed position
      ctx.drawImage(this.failPopupImage, 120, 150);
    } else {
      // hides the fail popup when the timeout has expired
      this.isFailPopupVisible = false;
    }
  }

  isColliding(newSpriteX, newSpriteY) {
    // checks collision between the ActiveObject and the sprite

    // checks if the sprite's boundaries overlap with the ActiveObject's boundaries
    return (
      newSpriteX < this.x + this.width && //this in this case is the active object
      newSpriteX + spriteSheet.width > this.x && //newSprite position is the calculated position of the moving sprite
      newSpriteY < this.y + this.height &&
      newSpriteY + spriteSheet.height > this.y // spriteSheet height/width is the amount of pixels contained in the sprite's image
    );
  }

  isInRange(spriteX, spriteY, threshold) {
    // function for checking if the sprite is within a certain range of the ActiveObject

    // calculates the distance between the sprite and the ActiveObject
    // the following four lines are inspired by: https://codeguppy.com/blog/how-to-calculate-the-distance-between-two-points-using-javascript-and-p5.js/index.html
    // the threshold is used to determine if the sprite is close enough to trigger the popup
    const distanceX = spriteX - this.x;
    const distanceY = spriteY - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // check if the distance between the sprite and the ActiveObject is less than the threshold
    // (threshold use inspired by chatgpt)
    return distance < threshold;
  }

  increaseSpacePresses(currentTime) {
    // method for increasing the space presses and managing the popups

    if (this.spacePresses < this.maxSpacePresses) {
      // if the space presses are less than the maximum allowed,
      // increase the space presses count, show the success popup,
      // and set the popup start time
      this.spacePresses++;
      this.isSuccessPopupVisible = true;
      this.popupStartTime = currentTime;

      // if the space presses reach the maximum allowed,
      // hide the success popup, show the success popup image,
      // and set the popup start time
      if (this.spacePresses === this.maxSpacePresses) {
        this.isSuccessPopupVisible = false;
        this.successPopupVisible = true;
        this.popupStartTime = currentTime;
      }
    } else {
      // if the space presses exceed the maximum allowed,
      // hide the success popup (if visible), show the fail popup, and set the popup start time
      if (this.isSuccessPopupVisible) {
        this.isSuccessPopupVisible = false;
      }
      this.isFailPopupVisible = true;
      this.popupStartTime = currentTime;
    }
  }
}
