import { InactiveObject } from "./inactive-objects.js";
import { ActiveObject } from "./active-objects.js";
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

  // creating inactive objects
  const bed = new InactiveObject(
    350,
    200,
    "game-assets/images/inactive-objects/bed.png",
    ctx
  );
  const wardrobe = new InactiveObject(
    435,
    130,
    "game-assets/images/inactive-objects/wardrobe.png",
    ctx
  );
  const hangingPlants = new InactiveObject(
    88,
    13,
    "game-assets/images/inactive-objects/hanging plants.png",
    ctx
  );
  const lights = new InactiveObject(
    0,
    10,
    "game-assets/images/inactive-objects/lights.png",
    ctx
  );
  const nightstand = new InactiveObject(
    255,
    180,
    "game-assets/images/inactive-objects/nightstand.png",
    ctx
  );
  const rug = new InactiveObject(
    100,
    290,
    "game-assets/images/inactive-objects/rug.png",
    ctx
  );
  const shelf = new InactiveObject(
    135,
    90,
    "game-assets/images/inactive-objects/shelf.png",
    ctx
  );

  //creating active objects
  const bookshelf = new ActiveObject(
    20,
    130,
    "game-assets/images/active-objects/bookshelf.png",
    ctx
  );
  const floorPlant = new ActiveObject(
    430,
    400,
    "game-assets/images/active-objects/floor plant.png",
    ctx
  );
  const painting = new ActiveObject(
    220,
    390,
    "game-assets/images/active-objects/painting.png",
    ctx
  );
  const playground = new ActiveObject(
    30,
    360,
    "game-assets/images/active-objects/playground.png",
    ctx
  );
  const table = new ActiveObject(
    120,
    200,
    "game-assets/images/active-objects/table.png",
    ctx
  );
  const window = new ActiveObject(
    240,
    95,
    "game-assets/images/active-objects/window.png",
    ctx
  );

  //borders for objects
  const borders = [{ left: 275, right: 355, top: 150, bottom: 230 }];

  // creating sprite object
  const spriteSheet = new Image(); //
  spriteSheet.onload = function () {
    // sprite position
    let spriteX = 150; //sprite start position
    let spriteY = 200;
    let spriteSpeed = 3; //how quickly sprite moves

    let direction = "down"; // default direction is down
    let isMoving = false; //check if sprite is moving

    // animation loop
    let frameIndex = 0; //which frame is displayed
    let framesPerSecond = 2; //update rate
    setInterval(function () {
      // update sprite frames (stationary bouncing up and down)
      if (isMoving) {
        // sprite moving, show walking animation
        framesPerSecond = 2;
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

      // update sprite position on room's margins
      if (spriteX < -45) {
        spriteX = -40;
        isMoving = false;
        spriteX -= spriteSpeed;
      } else if (spriteX > 430) {
        spriteX = 425;
      } else if (isColliding(spriteX, spriteY, borders)) {
        isMoving = false;
        spriteX = borders[0].left - 5; //stop sprite from moving when colliding with a border
      } else {
        isMoving = true; //when sprite is not colliding, allow movement
        if (spriteY < 145) {
          spriteY = 150;
        } else if (spriteY > 390) {
          spriteY = 385;
        }
      }

      //  if (spriteX > 280 && spriteY < 230 ){
      //   spriteX = 275;
      //  }
      function isColliding(spriteX, spriteY, borders) {
        const spriteBorders = {
          left: spriteX,
          right: spriteX + 5,
          top: spriteY,
          bottom: spriteY + 20,
        };
        // let collisionDetected = false;
        // const bedBorders = {
        //   left: 275,
        //   right: 355,
        //   top: 150,
        //   bottom: 230,
        // };

        for (const border of borders) { //for loop borders
          if (
            spriteBorders.right > border.left &&
            spriteBorders.left < border.right &&
            spriteBorders.top < border.bottom &&
            spriteBorders.bottom > border.top
          ) {
            return true; //moving is true
          }
        }
        {
          return false; //moving is false
        }

        // return collisionDetected;

        // return (
        //   spriteBorders.right > bedBorders.left &&
        //   spriteBorders.left < bedBorders.right &&
        //   spriteBorders.top < bedBorders.bottom &&
        //   spriteBorders.bottom > bedBorders.top
        // );
      }

      // if (isColliding(spriteX, spriteY, borders)) {
      //   spriteX = borders - 10;
      //   isMoving = false;
      // }

      // draw sprite and background
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(bedroom, 0, 0, gameCanvas.width, gameCanvas.height);

      // draw inactive objects
      bed.draw(ctx);
      wardrobe.draw(ctx);
      lights.draw(ctx);
      hangingPlants.draw(ctx);
      nightstand.draw(ctx);
      rug.draw(ctx);
      shelf.draw(ctx);

      //draw active objects
      bookshelf.draw(ctx);
      table.draw(ctx);
      window.draw(ctx);
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
      floorPlant.draw(ctx);
      painting.draw(ctx);
      playground.draw(ctx);
    }, 1000 / framesPerSecond); //how fast it loops

    // //putting borders
    // if (spriteX < 0){
    //   spriteX = 1;
    //   isMoving = false;
    // } else if (spriteX > 512){
    //   spriteX = 511;
    //   isMoving = false;
    // }

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
