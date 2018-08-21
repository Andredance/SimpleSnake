(function Game() {
  const boardHeight = 20;
  const boardWidth = 20;
  const boardDiv = document.getElementById('board');
  const body = document.getElementById('body');
  let board = [];
  let snakeX = 0;
  let snakeY = 0;
  let snakeDirection = 'Up';
  let snakeLength = 3;
  let appleX = 0;
  let appleY = 0;
  let snake = [];
  let apple = {};
  let speed = 200;
  let isKeyPressed = false;

  (function initBoard() {
    for (let i = 0; i < boardHeight; i++){
      let row = [];
      for (let j = 0; j < boardWidth; j++){
        let cell = {};
        cell.element = document.createElement('div');
        boardDiv.appendChild(cell.element);
        row.push(cell);
      }
      board.push(row);
    }
    body.addEventListener('keydown', (event) => {
      if (!isKeyPressed)
        switch (event.key) {
          case 'ArrowUp':
            snakeDirection = (snakeDirection !== 'Down') ? 'Up' : snakeDirection;
            break;
          case 'ArrowDown':
            snakeDirection = (snakeDirection !== 'Up') ? 'Down' : snakeDirection;
            break;
          case 'ArrowLeft':
            snakeDirection = (snakeDirection !== 'Right') ? 'Left' : snakeDirection;
            break;
          case 'ArrowRight':
            snakeDirection = (snakeDirection !== 'Left') ? 'Right' : snakeDirection;
            break;
          default:
            return;
        }
      isKeyPressed = true;
      event.preventDefault();
    });
  })();

  (function startGame() {
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        board[i][j].element.className = '';
      }
    }
    snake = [];
    apple = {};
    snakeLength = 3;
    snakeDirection = 'Up';
    isKeyPressed = false;
    snakeX = Math.floor(Math.random() * (boardWidth-11) + 6);
    snakeY = Math.floor(Math.random() * (boardHeight-11) + 6);
    snake.push(board[snakeY+2][snakeX]);
    snake.push(board[snakeY+1][snakeX]);
    snake.push(board[snakeY][snakeX]);
    snake.forEach(value => value.element.className = 'snake');
    placeApple();

    (function gameLoop() {
      switch (snakeDirection) {
        case 'Up':
          snakeY--;
          break;
        case 'Down':
          snakeY++;
          break;
        case 'Left':
          snakeX--;
          break;
        case 'Right':
          snakeX++;
          break;
      }
      if (snakeLength >= 400) {
        alert("Victory!");
        return;
      }
      if (snakeX < 0 || snakeY < 0 ||
        snakeX >= boardWidth || snakeY >= boardHeight ||
        snake.indexOf(board[snakeY][snakeX]) > -1) {
        alert('Game over!');
        startGame();
      }
      else {
        let cell = board[snakeY][snakeX];
        cell.element.className = 'snake';
        snake.push(cell);
        if (cell === apple) {
          apple.element.className = 'snake';
          placeApple();
        } else {
          let last = snake.shift();
          last.element.className = '';
        }
        isKeyPressed = false;
        setTimeout(gameLoop, speed);
      }
    })();
  })();



  function placeApple() {
    appleX = Math.floor(Math.random() * boardWidth);
    appleY = Math.floor(Math.random() * boardHeight);
    apple = board[appleY][appleX];
    if (snake.indexOf(apple) > -1)
      placeApple();
    apple.element.className = 'apple';
  }
})();