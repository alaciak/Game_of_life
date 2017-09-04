document.addEventListener("DOMContentLoaded", function(e) {

  function GameofLife(boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.cells = [];
    this.board = document.querySelector('#board');

    this.createBoard = function() {
      board.style.width = boardWidth * 10 + 'px';
      board.style.height = boardHeight * 10 + 'px';
      var fieldsNumber = boardWidth * boardHeight;
      for (var i = 0; i < fieldsNumber; i++) {
        var div = document.createElement('div');
        this.board.appendChild(div);
        this.cells.push(div);
      }
      for (i = 0; i < this.cells.length; i++) {
        this.cells[i].addEventListener('mouseenter', toggleLive);
      }

      function toggleLive(e) {
        if (this.className === 'live') {
          this.classList.remove('live');
        } else {
          this.classList.add('live');
        }
      }
    };

    this.getCell = function(x, y) {
      if (x < 0 || x >= boardWidth || y < 0 || y >= boardHeight) {
        return undefined;
      }
      var index = x + y * this.width;
      return this.cells[index];
    };

    this.setCellState = function(x, y, state) {
      var cell = this.getCell(x, y);
      if (cell.className === state) {
        cell.classList.remove(state);
      } else {
        cell.classList.add(state);
      }
    };

    this.firstGlider = function() {
      this.setCellState(2, 4, 'live');
      this.setCellState(3, 4, 'live');
      this.setCellState(4, 4, 'live');
      this.setCellState(4, 3, 'live');
      this.setCellState(3, 2, 'live');
    };

    this.computeCellNextState = function(x, y) {
      var sum = 0;
      var neighbour1 = this.getCell(x - 1, y - 1);
      if (neighbour1 && neighbour1.className === 'live') {
        sum++;
      }
      var neighbour2 = this.getCell(x, y - 1);
      if (neighbour2 && neighbour2.className === 'live') {
        sum++;
      }
      var neighbour3 = this.getCell(x + 1, y - 1);
      if (neighbour3 && neighbour3.className === 'live') {
        sum++;
      }
      var neighbour4 = this.getCell(x - 1, y);
      if (neighbour4 && neighbour4.className === 'live') {
        sum++;
      }
      var neighbour5 = this.getCell(x + 1, y);
      if (neighbour5 && neighbour5.className === 'live') {
        sum++;
      }
      var neighbour6 = this.getCell(x - 1, y + 1);
      if (neighbour6 && neighbour6.className === 'live') {
        sum++;
      }
      var neighbour7 = this.getCell(x, y + 1);
      if (neighbour7 && neighbour7.className === 'live') {
        sum++;
      }
      var neighbour8 = this.getCell(x + 1, y + 1);
      if (neighbour8 && neighbour8.className === 'live') {
        sum++;
      }

      var cell = this.getCell(x, y);
      if ((sum == 2 || sum == 3) && cell.className === 'live') {
        return 1;
      } else if (sum == 3 && cell.className !== 'live') {
        return 1;
      } else {
        return 0;
      }
    };

    this.computeNextGeneration = function() {
      var futureBoard = [];
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          futureBoard.push(this.computeCellNextState(x, y));
        }
      }
      return futureBoard;
    };

    this.printNextGeneration = function(futureBoard) {
      for (var i = 0; i < this.cells.length; i++) {
        if (futureBoard[i] === 1) {
          this.cells[i].classList.add('live');
        } else {
          this.cells[i].classList.remove('live');
        }
      }
    };

  }
  var interval;
  var playButton = document.querySelector('#play');
  playButton.addEventListener('click', function(e) {
    if (!game.isRunning) {
      interval = setInterval(function() {
        game.printNextGeneration(game.computeNextGeneration());
      }, 150);
      game.isRunning = true;
    }
  });

  var pauseButton = document.querySelector('#pause');
  pauseButton.addEventListener('click', function(e) {
    clearInterval(interval);
    game.isRunning = false;
  });

  function getBoard() {
    width = prompt('Please enter board width (number of cells)');
    height = prompt('Please enter board height (number of cells)');
  }
  getBoard();
  var game = new GameofLife(width, height);
  game.createBoard();
  game.firstGlider();


});
