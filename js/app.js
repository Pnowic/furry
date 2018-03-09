var Furry = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

var Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

var Game = function() {
    this.board = document.querySelector("#board").querySelectorAll("div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
};