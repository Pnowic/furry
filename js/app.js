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
    this.furryIndex = function (x, y) {
        return x + (y * 10);
    };
    this.coinIndex = function (x, y) {
        return x + (y * 10);

    };
    this.showFurry = function () {
        this.board[ this.furryIndex(this.furry.x,this.furry.y) ].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[ this.coinIndex(this.coin.x,this.coin.y) ].classList.add('coin');
    };


    var self = this;

    this.startGame = function() {
        this.interval250 = setInterval(function() {
            self.moveFurry();
        }, 250);
    };

    this.moveFurry = function() {
        this.hideVisibleFurry();
        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y - 1;
        }
        else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y + 1;
        }
        this.showFurry();
    };

    this.hideVisibleFurry = function (){
        var furryDiv = document.querySelector('div.furry');
        furryDiv.classList.remove('furry');
    }







};

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();