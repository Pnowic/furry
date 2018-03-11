var Coin = require("./coin.js");
var Furry = require("./furry.js");


var Game = function() {

    var self = this;

    self.board = document.querySelector("#board").querySelectorAll("div");
    self.scoreCounter = document.querySelector('#score').querySelector('strong');
    self.furry = new Furry();
    self.coin = new Coin();
    self.score = 0;
    self.speed = 700;
    self.isGameOver = false;

    self.furryIndex = function (x, y) {
        return x + (y * 10);
    };

    self.coinIndex = function (x, y) {
        return x + (y * 10);

    };

    self.showFurry = function () {
        self.hideVisibleFurry();
        self.board[ self.furryIndex(self.furry.x,self.furry.y) ].classList.add('furry');
    };

    self.hideVisibleFurry = function (){
        var furryDiv = document.querySelector('div.furry');
        if(furryDiv){
            furryDiv.classList.remove('furry');
        }
    };

    self.showCoin = function () {
        self.board[ self.coinIndex(self.coin.x,self.coin.y) ].classList.add('coin');
    };

    self.moveFurry = function() {
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

        if (self.isGameOver === true) {
            return;
        }

        self.startGame();
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

    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });

    self.checkCoinCollision = function(){
        if (self.furry.x === self.coin.x && self.furry.y === self.coin.y){
            var currentCoin = document.querySelector('div.coin');
            currentCoin.classList.remove('coin');
            self.score = self.score + 1;
            document.querySelector('strong').innerText = self.score;
            self.coin = new Coin();
            self.showCoin();
            self.speed = self.speed - 20;
        }
    };

    self.gameOver = function () {
        if (self.furry.x < 0 || self.furry.y < 0 || self.furry.x > 9 || self.furry.y > 9){
            self.isGameOver = true;
            self.hideVisibleFurry();
            self.stopGame();
            self.createScoreBoard();

        }
    };

    self.createScoreBoard = function() {
        var scoreBoard = document.querySelector('#board');
        var score = document.createElement('div');
        var wrapperScore = document.createElement('div');
        wrapperScore.className = "wrapperScore";
        score.innerText = "GAME OVER YOUR SCORE: " + self.score;
        for (var i = 0; i < self.board.length; i++) {
            self.board[i].classList.add('invisible');
        }
        scoreBoard.appendChild(wrapperScore);
        wrapperScore.appendChild(score);
        self.newGame();
    };

    self.newGame = function() {
        var newGame = document.createElement("button");
        var scoreBoard = document.querySelector("#board .wrapperScore");
        newGame.innerText = "PLAY AGAIN !";
        newGame.addEventListener("click", function() {
            location.reload(); //laduje strone ponownie
        });
        scoreBoard.appendChild(newGame);
    };

    self.startGame = function() {
        self.startMove = setTimeout(function() {
            self.moveFurry();
        }, self.speed);
    };

    self.stopGame = function() {
        clearTimeout(self.startMove);
    };

    var startButton = document.querySelector(".start-button");

    startButton.addEventListener("click", function() {
        self.startGame();
        startButton.remove();
    }, false);


};

module.exports = Game;