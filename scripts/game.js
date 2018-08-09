(function Game() {
  const boardHeight = 20;
  const boardWidth = 20;
  const boardDiv = document.getElementById('board');
  let board = [];
  let snakeX = 0;
  let snakeY = 0;
  let direction = 'Up';
  let snakeLength = 3;

  (function initBoard(height, width) {
    for (let i = 0; i < height; i++){
      let row = [];
      for (let j = 0; j < width; j++){
        let cell = {
          snake: 0
        };
        cell.element = document.createElement('div');
        boardDiv.appendChild(cell.element);
        row.push(cell);
      }
      board.push(row);
    }
  })(boardHeight, boardWidth);
  (function startGame() {
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    board[snakeX][snakeY].snake = 1;
  })();
})();