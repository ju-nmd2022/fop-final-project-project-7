//add choosen character to local storage 
document.getElementById("linnea").addEventListener("click", function () {
    localStorage.setItem("selectedCharacter", "game-assets/images/sprite-sheets/sprite-sheet-linnea.png");
  });
  
  document.getElementById("bianca").addEventListener("click", function () {
    localStorage.setItem("selectedCharacter", "game-assets/images/sprite-sheets/sprite-sheet-bianca.png");
  });
  