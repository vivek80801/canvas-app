//@ts-check

const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
const restartBtn = document.getElementById("restart");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
/**
 * @type {HTMLButtonElement}
 */
const btns = document.querySelector(".buttons");

let score = 0;
let life = 3;
/**
 * @type {Brick[][]}
 */
let bricks = [];

class Ball {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {string} color
   */
  constructor(x, y, r, color) {
    this.dx = 0.5;
    this.dy = -0.5;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.x + this.r >= cvs.width || this.x - this.r <= 0) {
      this.dx = -this.dx;
    }
    if (
      this.y + this.r - (cvs.height + paddle.height) <= 0 &&
      this.x < paddle.x + paddle.width &&
      this.x > paddle.x - paddle.width
    ) {
      if (
        this.y + this.r + paddle.height >= cvs.height ||
        this.y - this.r <= 0
      ) {
        this.dy = -this.dy;
      }
    } else if (this.y - this.r <= 0) {
      this.dy = -this.dy;
    } else if (this.y + this.r >= cvs.height) {
      paddle.x = cvs.width / 2;
      this.x = cvs.width / 2;
      this.y = cvs.height / 2;
      this.dx = 0.5;
      this.dy = -0.5;
      life--;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

class Paddle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} color
   */
  constructor(x, y, w, h, color) {
    this.dx = 5;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.dx;
    }
  }
  moveRight() {
    if (this.x + this.width < cvs.width) {
      this.x += this.dx;
    }
  }
}

class Brick {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} color
   */
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.broken = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const ball = new Ball(cvs.width / 2, cvs.height / 2, 5, "#fff");
const paddle = new Paddle(cvs.width / 2, cvs.height, 10, 10, "#00f");
const row = cvs.width;
const column = cvs.height / 2;
let xoffset = 10;
let yoffset = 10;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.code === "KeyH") {
    paddle.moveLeft();
  }
  if (e.key === "ArrowRight" || e.code === "KeyL") {
    paddle.moveRight();
  }
  if (e.code === "Space" && life === 0) {
    restartBtn.style.display = "none";
    btns.style.justifyContent = "space-between";
    leftBtn.style.display = "inline";
    rightBtn.style.display = "inline";
    restartGame();
  }
  if (e.code === "Space" && bricks.length <= 0) {
    restartBtn.style.display = "none";
    btns.style.justifyContent = "space-between";
    leftBtn.style.display = "inline";
    rightBtn.style.display = "inline";
    restartGame();
  }
});

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  btns.style.justifyContent = "space-between";
  leftBtn.style.display = "inline";
  rightBtn.style.display = "inline";
  restartGame();
});

leftBtn.addEventListener("click", () => {
  paddle.moveLeft();
});

rightBtn.addEventListener("click", () => {
  paddle.moveRight();
});

const restartGame = () => {
  life = 3;
  score = 0;
  bricks = [];
  createBricks();
};

const createBricks = () => {
  for (let r = 0; r <= row; r += 2 * xoffset) {
    bricks[r] = [];
    for (let c = 15; c <= column; c += 2 * yoffset) {
      bricks[r].push(new Brick(r, c, 10, 10, "#f0f"));
    }
  }
};

const writeScore = () => {
  const newScroe = "Score: " + score;
  ctx.fillStyle = "#0ff";
  ctx.font = "25px";
  ctx.fillText(newScroe, cvs.width - 50, 10);
};

const writeLife = () => {
  const newLife = "Life: " + life;
  ctx.fillStyle = "#0ff";
  ctx.font = "25px";
  ctx.fillText(newLife, 10, 10);
};

const drawBricks = () => {
  for (let i = 0; i < bricks.length; i += 2 * xoffset) {
    for (let k = 0; k < bricks[i].length; k++) {
      if (!bricks[i][k].broken) {
        bricks[i][k].draw();
        if (
          bricks[i][k].x - bricks[i][k].width <= ball.x + ball.r &&
          bricks[i][k].x + bricks[i][k].width >= ball.x - ball.r &&
          bricks[i][k].y + bricks[i][k].height >= ball.y + ball.r &&
          bricks[i][k].y - bricks[i][k].height <= ball.y - ball.r
        ) {
          bricks[i][k].broken = true;
          ball.dx = -ball.dx;
          ball.dy = -ball.dy;
          score++;
        }
      }
    }
  }
};

createBricks();

const initGame = () => {
  ball.update();
  ball.draw();
  paddle.draw();
  drawBricks();
  writeScore();
  writeLife();
};

const animate = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  if (life <= 0) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    ctx.fillStyle = "#0ff";
    ctx.font = "25px";
    ctx.fillText("Game over", cvs.width / 2, cvs.height / 2);
    ctx.fillText(
      "To restart the game. Press 'Space'",
      cvs.width / 2 - 50,
      cvs.height / 2 + 20
    );
    btns.style.justifyContent = "center";
    restartBtn.style.display = "inline";
  } else if (bricks.length <= 0) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    ctx.fillStyle = "#0ff";
    ctx.font = "25px";
    ctx.fillText("You win the game", cvs.width / 2, cvs.height / 2);
    ctx.fillText(
      "To restart the game. Press 'Space'",
      cvs.width / 2 - 50,
      cvs.height / 2 + 20
    );
    btns.style.justifyContent = "center";
    restartBtn.style.display = "inline";
  } else {
    initGame();
  }
  requestAnimationFrame(animate);
};

animate();
