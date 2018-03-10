var Coin = require("./coin.js");
var Furry = require("./furry.js");


var Game = function() {

    var self = this;

    self.board = document.querySelector("#board").querySelectorAll("div");
    self.scoreCounter = document.querySelector('#score').querySelector('strong');
    self.furry = new Furry();
    self.coin = new Coin();
    self.score = 0;

    self.furryIndex = function (x, y) {
        return x + (y * 10);
    };

    self.coinIndex = function (x, y) {
        return x + (y * 10);

    };

    self.showFurry = function () {

        self.board[ self.furryIndex(self.furry.x,self.furry.y) ].classList.add('furry');
    };

    self.hideVisibleFurry = function (){
        var furryDiv = document.querySelector('div.furry');
            furryDiv.classList.remove('furry');

    };

    self.showCoin = function () {
        self.board[ self.coinIndex(self.coin.x,self.coin.y) ].classList.add('coin');
    };

    self.moveFurry = function() {
        self.hideVisibleFurry();
        if (self.furry.direction === 'right') {
            self.furry.x = self.furry.x + 1;
        }
        else if (self.furry.direction === 'left') {
            self.furry.x = self.furry.x - 1;
        }
        else if (self.furry.direction === 'up') {
            self.furry.y = self.furry.y - 1;
        }
        else if (self.furry.direction === 'down') {
            self.furry.y = self.furry.y + 1;
        }

        self.gameOver();
        self.showFurry();
        self.checkCoinCollision();
    };

    self.turnFurry = function (event){
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';
                break;

            case 38:
                self.furry.direction = 'up';
                break;

            case 39:
                self.furry.direction = 'right';
                break;

            case 40:
                self.furry.direction = 'down';
                break;
        }
    };

    self.checkCoinCollision = function(){
        if (self.furry.x === self.coin.x && self.furry.y === self.coin.y){
            var currentCoin = document.querySelector('div.coin');
            currentCoin.classList.remove('coin');
            self.score = self.score + 1;
            document.querySelector('strong').innerText = self.score;
            self.coin = new Coin();
            self.showCoin()
        }
    };

    self.gameOver = function () {
        if (self.furry.x < 0 || self.furry.y < 0 || self.furry.x > 9 || self.furry.y > 9){
            clearInterval(self.interval250);
            document.querySelector('#over').classList.remove('invisible');
            document.querySelector('p strong').innerText = self.score;
            self.hideVisibleFurry();

        }
    };

    self.startGame = function() {
        self.interval250 = setInterval(function() {
            self.moveFurry();
        }, 250);
    };

    var startButton = document.querySelector("#start-button");

    startButton.addEventListener("click", function() {
        self.startGame();
        startButton.remove();
    }, false);

};

module.exports = Game;