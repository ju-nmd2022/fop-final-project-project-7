import { InactiveObject } from "./objects.js";
window.addEventListener("load", function () {
  //for when window loads
  const gameCanvas = document.getElementById("gameCanvas"); //references the game canvas
  const ctx = gameCanvas.getContext("2d"); //draws on canvas

  /* creating background
  the following 10 lines of code was adapted
  from Drew Conley on YouTube
  https://www.youtube.com/watch?v=fyi4vfbKEeo&t=141s */
  const bedroom = new Image();
  bedroom.src = "game-assets/images/bedroom.png";
  // bedroom.onload = function () {
  // ctx.drawImage(bedroom, 0, 0, gameCanvas.width, gameCanvas.height);
  // };

  // creating bed object
  // const bed = new Image();
  // bed.onload = function () {
  //   ctx.drawImage(bed, 400, 200);
  // };
  // bed.src = "game-assets/images/inactive-objects/bed.png";
  const bed = new InactiveObject(350, 250,"game-assets/images/inactive-objects/bed.png", ctx);

  // creating sprite object
  const spriteSheet = new Image(); //
  spriteSheet.onload = function () {
    // sprite position
    let spriteX = 150; //sprite start position
    let spriteY = 200;
    let spriteSpeed = 2; //how quickly sprite moves

    let direction = "down"; // default direction is down
    let isMoving = false; //check if sprite is moving

    // animation loop
    let frameIndex = 0; //which frame is displayed
    let framesPerSecond = 2; //update rate
    setInterval(function () {
      // update sprite frames (stationary bouncing up and down)
      if (isMoving) {
        // sprite moving, show walking animation
        framesPerSecond = 4;
        frameIndex++;
        if (frameIndex >= 4) {
          //cycles through 4 frames
          frameIndex = 0; //resets
        }
      } else {
        // sprite not moving, show standing animation
        framesPerSecond = 2;
        frameIndex++;
        if (frameIndex >= 2) {
          //cycles through 2 frames
          frameIndex = 0; //resets
        }
      }

      // draw sprite and background
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(bedroom, 0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(
        spriteSheet,
        frameIndex * 128,
        getSpriteRow(direction) * 128, // calculate row based on direction
        128, //size of sprite
        128,
        spriteX,
        spriteY,
        128,
        128
      );
      bed.draw(ctx);
    }, 1000 / framesPerSecond); //how fast it loops

    // update direction based on arrow keys
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        spriteX += spriteSpeed;
        direction = "right";
        isMoving = true;
      }
      if (event.key === "ArrowLeft") {
        spriteX -= spriteSpeed;
        direction = "left";
        isMoving = true;
      }
      if (event.key === "ArrowDown") {
        spriteY += spriteSpeed;
        direction = "down";
        isMoving = true;
      }
      if (event.key === "ArrowUp") {
        spriteY -= spriteSpeed;
        direction = "up";
        isMoving = true;
      }
    });

    document.addEventListener("keyup", function (event) {
      // stop sprite movement
      spriteX.destX = spriteX; //stops X at any destination
      spriteY.destY = spriteY; //stops Y at any destination
      isMoving = false; //reset isMoving
    });

    function getSpriteRow(direction) {
      switch (direction) {
        case "up":
          return 3; //going up
        case "down":
          return 0; //going down
        case "left":
          return 2; //going left
        case "right":
          return 1; //going right
        default: //stopped default
          return 0;
      }
    }
  };
  spriteSheet.src = "game-assets/images/sprite-sheets/sprite-sheet-bianca.png"; //sprite sheet source
});
