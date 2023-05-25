import { InactiveObject } from "./inactive-objects.js";
import { ActiveObject } from "./active-objects.js";
// not inside of the window.addEventListener because it has
// to be at the top of the JavaScript file. allows better readability,
// prevents errors, and ensures modules are imported properly before
// any other code is executed. it creates a short lag in terms of loading
// everything else besides the objects, but it does not seem to
// cause an issue

// borders array for objects
const borders = [
  { left: 275, right: 375, top: 130, bottom: 230 },
  { left: -20, right: 90, top: 330, bottom: 400 },
  { left: 130, right: 270, top: 330, bottom: 400 },
  { left: 370, right: 450, top: 330, bottom: 400 },
];

window.addEventListener("load", function () {
  // executes when the window finishes loading,
  // otherwise it will cause errors because
  // it is loaded before the DOM is finished
  const gameCanvas = document.getElementById("gameCanvas"); // references the game canvas through its ID
  const ctx = gameCanvas.getContext("2d");   // gets 2D rendering context on canvas
  // context is used for drawing on the canvas

  // creating background
  const bedroom = new Image();
  bedroom.src = "game-assets/images/bedroom.png";

  // creating inactive objects
  const bed = new InactiveObject(
    350, // position
    200, // position
    "game-assets/images/inactive-objects/bed.png", // source
    ctx // sets rendering context
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
    20, // position
    130, // position
    "game-assets/images/active-objects/bookshelf.png", // source
    ctx, // sets rendering context
    2, // max presses for reading a book
    "game-assets/images/success-popups/magic-book.png", // source for success popup
    "game-assets/images/fail-popups/reading.png", // source for fail popup
    2000 // timeout in milliseconds
  );
  const floorPlant = new ActiveObject(
    430,
    400,
    "game-assets/images/active-objects/floor plant.png",
    ctx,
    1, // max presses for watering the plant
    "game-assets/images/success-popups/planti.png",
    "game-assets/images/fail-popups/drown.png",
    2000
  );
  const painting = new ActiveObject(
    220,
    390,
    "game-assets/images/active-objects/painting.png",
    ctx,
    1, // max presses for painting
    "game-assets/images/success-popups/bob.png",
    "game-assets/images/fail-popups/painting.png",
    2000
  );
  const playground = new ActiveObject(
    30,
    360,
    "game-assets/images/active-objects/playground.png",
    ctx,
    3, // max presses for petting cat
    "game-assets/images/success-popups/happy-cat.png",
    "game-assets/images/fail-popups/cat.png",
    2000
  );
  const table = new ActiveObject(
    120,
    200,
    "game-assets/images/active-objects/table.png",
    ctx,
    1, // max presses for watching videos
    "game-assets/images/success-popups/game.png",
    "game-assets/images/fail-popups/pc.png",
    2000
  );
  const gameWindow = new ActiveObject(
    240,
    95,
    "game-assets/images/active-objects/window.png",
    ctx,
    4, // max presses for looking out the window
    "game-assets/images/success-popups/window-view.png",
    "game-assets/images/fail-popups/window2.png",
    2000
  );

  // array for all active objects
  const activeObjects = [
    bookshelf,
    floorPlant,
    painting,
    playground,
    table,
    gameWindow,
  ];

  // creating sprite object and accessing them through local storage
  const selectedCharacter = localStorage.getItem("selectedCharacter");
  const spriteSheet = new Image();
  spriteSheet.src = selectedCharacter; // sets source to selectedCharacter

  spriteSheet.onload = function () { // executes when sprite sheet is loaded
    // sprite position variables
    let spriteX = 180; //sprite start position
    let spriteY = 260; // sprite start position
    let newSpriteX = spriteX; // updated position of sprite
    let newSpriteY = spriteY; // updated position of sprite
    let spriteSpeed = 3; //how quickly sprite moves

    let direction = "down"; // default direction is down
    let isWalking = false; // check if sprite is moving

    // animation loop
    let frameIndex = 0; // which frame is displayed
    let framesPerSecond = 2; // number of frame update rate per second

    //score variables
    let score = 0; // current score set to 0
    let pointsLost = 0; // points lost set to 0
    const loseThreshold = 4; // threshold for how many points user can lose before losing

    let selectedCharacter = spriteSheet; // sprite sheet image, contains multiple frames
    setInterval(function () { // function executed repeatedly at a set interval
      // update sprite frames (stationary bouncing up and down)
      if (isWalking) {
        // sprite walking, show walking animation
        framesPerSecond = 2; // animation speed
        frameIndex++; // move to next frame
        if (frameIndex >= 4) { // when all frames have been shown, reset to first frame
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
        // update sprite position based on current direction
        switch (direction) {
          case "up":
            newSpriteY = spriteY - spriteSpeed;
            break;
          case "down":
            newSpriteY = spriteY + spriteSpeed;
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
      for (const object of activeObjects) {
        if (object.isColliding(newSpriteX, newSpriteY)) {
          isCollision = true;
        }
      }

      // update sprite position on room's margins
      if (spriteX < -45) {
        spriteX = -40;
        isWalking = false;
        spriteX -= spriteSpeed; // move sprite slightly to left
      } else if (spriteX > 430) {
        spriteX = 425;
      } else {
        if (spriteY < 140) {
          spriteY = 145;
        } else if (spriteY > 390) {
          spriteY = 385;
        }
      }

      //stop position movement - if not added, sprite moves on its own
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
      } else { // checks for collision with borders
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
              spriteY = border.top; //adjusts position to stay in that border position to prevent movement/teleportation
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
      bookshelf.draw(spriteX, spriteY, ctx, score);
      table.draw(spriteX, spriteY, ctx, score);
      gameWindow.draw(spriteX, spriteY, ctx, score);
      //draw sprite
      ctx.drawImage(
        selectedCharacter,
        frameIndex * 128,
        getSpriteRow(direction) * 128, // calculate row based on direction
        128, // size of sprite
        128,
        spriteX,
        spriteY,
        128,
        128
      );
      //draw active objects in foreground
      floorPlant.draw(spriteX, spriteY, ctx, score);
      painting.draw(spriteX, spriteY, ctx, score);
      playground.draw(spriteX, spriteY, ctx, score);

      //draw the popup images
      bookshelf.drawPopups(ctx, Date.now()); // current timestamp received
      table.drawPopups(ctx, Date.now()); 
      gameWindow.drawPopups(ctx, Date.now());
      floorPlant.drawPopups(ctx, Date.now());
      painting.drawPopups(ctx, Date.now());
      playground.drawPopups(ctx, Date.now());

      //draw score on screen
      ctx.fillStyle = "white";
      ctx.font = "20px Courier";
      ctx.fillText("Score: " + score, 10, 30);

      if (score === 12) { // winning score
        window.location.href = "win-screen.html"; // send to win screen
      } else if (pointsLost === loseThreshold) { // lose 4 points
        window.location.href = "lose-screen.html"; // send to lose screen
      }
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
    //user presses space to complete activity and increase score
    document.addEventListener("keydown", (event) => { // listens for space key pressed
      if (event.code === "Space") {
        const currentTime = Date.now(); //current timestamp in milliseconds
        for (const object of activeObjects)
          if (object.isInRange(spriteX, spriteY, 80)) { // checks if sprite is in range of object (80 pixels)
            if (object.spacePresses < object.maxSpacePresses) {
              // check if the spacePresses counter of the object is less than its maximum allowed presses
              object.increaseSpacePresses(currentTime);
              // increase the spacePresses counter of the object and update its timestamp
              object.isSuccessPopupVisible = true; // display success popup
              score++; // increase score by 1
            } else { // if maximum number of presses is reached
              if (score > 0) {
                score--; // decrease score by 1 if greater than 0 to avoid negative values
              }
              object.isFailPopupVisible = true; // show fail popup
              object.popupStartTime = currentTime; // sets start time to current timestamp
              pointsLost++; // increase points lost by 1
            }
          }
      }
    });
  };
});
