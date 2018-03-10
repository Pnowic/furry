var Game = require("./game.js");

var game = new Game();
game.showFurry();
game.showCoin();

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});