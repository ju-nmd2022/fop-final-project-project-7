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

  // creating sprite object
  const spriteSheet = new Image(); //
  spriteSheet.onload = function () {
    // sprite position
    let spriteX = 0;
    let spriteY = 0;

    // animation loop
    let frameIndex = 0;
    let framesPerSecond = 2;
    setInterval(function () {
      // update sprite frames (stationary bouncing up and down)
      frameIndex++;
      if (frameIndex >= 2) {
        frameIndex = 0;
      }

      // draw sprite and background
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(bedroom, 0, 0, gameCanvas.width, gameCanvas.height);
      ctx.drawImage(
        spriteSheet,
        frameIndex * 128,
        128 * 0, //position view of sprite
        128, //size of sprite
        128,
        spriteX,
        spriteY,
        128,
        128
      );
    }, 1000 / framesPerSecond); //how fast it loops
  };
  spriteSheet.src = "game-assets/images/sprite-sheets/sprite-sheet-bianca.png";
});
