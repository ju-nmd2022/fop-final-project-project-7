import { InactiveObject } from "./inactive-objects.js";
import { ActiveObject } from "./active-objects.js";

//borders array for objects
const borders = [
  { left: 275, right: 375, top: 130, bottom: 230 },
  { left: 0, right: 90, top: 340, bottom: 390 },
  { left: 140, right: 280, top: 340, bottom: 390 },
  { left: 360, right: 430, top: 340, bottom: 390 },
];

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

  // creating sprite object
  const spriteSheet = new Image(); //
  spriteSheet.onload = function () {
    // sprite position
    let spriteX = 150; //sprite start position
    let spriteY = 200;
    let newSpriteX = spriteX;
    let newSpriteY = spriteY;
    let spriteSpeed = 3; //how quickly sprite moves

    let direction = "down"; // default direction is down
    let isWalking = false; //check if sprite is moving

    // animation loop
    let frameIndex = 0; //which frame is displayed
    let framesPerSecond = 2; //update rate
    setInterval(function () {
      // update sprite frames (stationary bouncing up and down)
      if (isWalking) {
        // sprite walking, show walking animation
        framesPerSecond = 2;
        frameIndex++;
        if (frameIndex >= 4) {
          //cycles through 4 frames
          frameIndex = 0; //resets
        }
      } else {
        // sprite not walking, show standing animation
        framesPerSecond = 2;
        frameIndex++;
        if (frameIndex >= 2) {
          //cycles through 2 frames
          frameIndex = 0; //resets
        }
        // sprite is moving
        switch (direction) {
          case "up":
            newSpriteY = spriteY - spriteSpeed;
            break;
          case "down":
            newSpriteY;
            break;
          case "left":
            newSpriteX = spriteX - spriteSpeed;
            break;
          case "right":
            newSpriteX = spriteX + spriteSpeed;
            break;
        }
      }

      // check for collision with inactive objects
      let isCollision = false;
      for (const object of [
        bed,
        wardrobe,
        hangingPlants,
        lights,
        nightstand,
        rug,
        shelf,
      ]) {
        if (object.isColliding(newSpriteX, newSpriteY)) {
          isCollision = true;
        }
      }
      // check for collision with active objects
      for (const object of [
        bookshelf,
        floorPlant,
        painting,
        playground,
        table,
        window,
      ]) {
        if (object.isColliding(newSpriteX, newSpriteY)) {
          isCollision = true;
        }
      }

      // update sprite position on room's margins
      if (spriteX < -45) {
        spriteX = -40;
        isWalking = false;
        spriteX -= spriteSpeed;
      } else if (spriteX > 430) {
        spriteX = 425;
      } else {
        if (spriteY < 145) {
          spriteY = 150;
        } else if (spriteY > 390) {
          spriteY = 385;
        }
      }

      //stop position movement
      if (
        newSpriteX < 0 ||
        newSpriteX + spriteSheet.width > gameCanvas.width ||
        newSpriteY < 0 ||
        newSpriteY + spriteSheet.height > gameCanvas.height
      ) {
        isCollision = true;
      }
      // adjust sprite position if there is collision
      if (!isCollision) {
        spriteX = newSpriteX;
        spriteY = newSpriteY;
      } else {
        for (const border of borders) {
          if (
            spriteX > border.left &&
            spriteX < border.right &&
            spriteY > border.top &&
            spriteY < border.bottom
          ) {
            //stop sprite movement
            isWalking = false;
            if (direction === "down") {
              spriteY = border.top;
              break;
            } else if (direction === "left") {
              spriteX = border.right;
              break;
            } else if (direction === "right") {
              spriteX = border.left;
              break;
            } else if (direction === "up") {
              spriteY = border.bottom;
              break;
            }
          }
        }
      }
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

      //draw active objects in background
      bookshelf.draw(spriteX, spriteY, ctx);
      table.draw(spriteX, spriteY, ctx);
      window.draw(spriteX, spriteY, ctx);
      //draw sprite
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
      //draw active objects in foreground
      floorPlant.draw(spriteX, spriteY, ctx);
      painting.draw(spriteX, spriteY, ctx);
      playground.draw(spriteX, spriteY, ctx);
    }, 1000 / framesPerSecond); //how fast it loops

    // update direction based on arrow keys
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        spriteX += spriteSpeed;
        direction = "right";
        isWalking = true;
      }
      if (event.key === "ArrowLeft") {
        spriteX -= spriteSpeed;
        direction = "left";
        isWalking = true;
      }
      if (event.key === "ArrowDown") {
        spriteY += spriteSpeed;
        direction = "down";
        isWalking = true;
      }
      if (event.key === "ArrowUp") {
        spriteY -= spriteSpeed;
        direction = "up";
        isWalking = true;
      }
    });

    document.addEventListener("keyup", function (event) {
      // stop sprite movement
      isWalking = false; //reset isMoving
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
