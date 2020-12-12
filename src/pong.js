'use strict';

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set len(value) {
    const f = value / this.len;
    this.x *= f;
    this.y *= f;
  }
}

class Rect {
  constructor(options) {
    options = options || {};

    this.pos = new Vector(options.x || 0, options.y || 0);
    this.size = new Vector(options.width || 0, options.height || 0);
  }

  get width() {
    return this.size.x;
  }

  get height() {
    return this.size.y;
  }

  get left() {
    return this.pos.x - this.size.x / 2;
  }

  get right() {
    return this.pos.x + this.size.x / 2;
  }

  get top() {
    return this.pos.y - this.size.y / 2;
  }

  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
}

class Ball extends Rect {
  constructor(options) {
    options = options || {};

    super({
      x: options.x || 0,
      y: options.y || 0,
      width: options.width || 10,
      height: options.height || 10,
    });

    this.vel = new Vector();
  }
}

class Player extends Rect {
  constructor(options) {
    options = options || {};

    super({
      x: options.x || 0,
      y: options.y || 0,
      width: options.width || 20,
      height: options.height || 100,
    });

    this.score = 0;
  }
}

class Pong {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.initialSpeed = 250;

    this._acumulator = 0;
    this.step = 1 / 240;

    this.ball = new Ball();
    console.log(this.ball);

    this.players = [
      new Player({x: 40, y: this.height / 2}),
      new Player({x: this.width - 40, y: this.height / 2})
    ];

    this.reset();
  }

  collide(player, ball) {
    if (player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top) {
      ball.vel.x = -ball.vel.x * 1.05;
      const len = ball.vel.len;
      ball.vel.y += 300 * (Math.random() - .5);
      ball.vel.len = len;

      console.log(ball.vel);
      ball.pos.x = ball.vel.x > 0 ? player.right + ball.width / 2 : player.left - ball.width / 2;
    }
  }

  play() {
    const ball = this.ball;

    if (ball.vel.x === 0 && ball.vel.y === 0) {
      ball.vel.x = 200 * (Math.random() > .5 ? 1 : -1);
      ball.vel.y = 200 * (Math.random() * 2 - 1);
      ball.vel.len = this.initialSpeed;
    }
  }

  reset() {
    const ball = this.ball;
    ball.vel.x = 0;
    ball.vel.y = 0;
    ball.pos.x = this.width / 2;
    ball.pos.y = this.height / 2;
  }

  update(deltaTime) {
    const ball = this.ball;
    ball.pos.x += ball.vel.x * deltaTime;
    ball.pos.y += ball.vel.y * deltaTime;

    if (ball.right < 0 || ball.left > this.width) {
      ++this.players[ball.vel.x < 0 | 0].score;
      this.reset();
    }

    if (ball.vel.y < 0 && ball.top < 0 ||
      ball.vel.y > 0 && ball.bottom > this.height) {
      ball.vel.y = -ball.vel.y;
    }

    if (ball.pos.x < (this.width / 2)) {
      if (this.players[1].top > (this.height / 2)) {
        this.players[1].pos.y -= 300 * deltaTime;
      }

      if (this.players[1].bottom < (this.height / 2)) {
        this.players[1].pos.y += 300 * deltaTime;
      }
    } else {
      if (this.players[1].pos.y > ball.pos.y) {
        this.players[1].pos.y -= 300 * deltaTime;
      }

      if (this.players[1].bottom < ball.pos.y) {
        this.players[1].pos.y += 300 * deltaTime;
      }
    }

    // this.players[1].pos.y = ball.pos.y;

    this.players.forEach(player => {
      this.collide(player, ball);
    });
  }

  simulate(deltaTime) {
    this._acumulator += deltaTime;

    while (this._acumulator > this.step) {
      this.update(this.step);
      this._acumulator -= this.step;
    }
  }
}

class Score {
  constructor(width) {
    this.WIDTH = width;
    this.ALIGN = width / 3;

    this.CHAR_PIXEL = 10;
    this.CHAR_WIDTH = 4 * this.CHAR_PIXEL;

    this.CHARS_STRINGS = [
      '111101101101111',
      '010010010010010',
      '111001111100111',
      '111001111001111',
      '101101111001001',
      '111100111001111',
      '111100111101111',
      '111001001001001',
      '111101111101111',
      '111101111001111',
    ];

    this.CHARS = this.CHARS_STRINGS.map(str => {
      const canvas = document.createElement('canvas');
      const s = this.CHAR_PIXEL;
      canvas.height = s * 5;
      canvas.width = s * 3;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ECC94B';
      str.split('').forEach((fill, i) => {
        if (fill === '1') {
          context.fillRect((i % 3) * s, (i / 3 | 0) * s, s, s);
        }
      });
      return canvas;
    });
  }

  draw(context, score, index) {
    const chars = score.toString().split('');
    const offset = this.ALIGN * (index + 1) - (this.CHAR_WIDTH * chars.length / 2) + this.CHAR_PIXEL / 2;
    chars.forEach((char, pos) => {
      context.drawImage(this.CHARS[char|0], offset + pos * this.CHAR_WIDTH, 20);
    });
  }
}

class Canvas {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this._canvas.width = document.body.clientWidth - 20;
    this._canvas.height = document.body.clientHeight - 20;

    this.pong = new Pong(canvas.width, canvas.height);
    this.score = new Score(canvas.width);
  }

  setUpCanvas() {
    this._canvas.width = document.body.clientWidth - 20;
    this._canvas.height = document.body.clientHeight - 20;
  }

  setUpMoveMove() {
    this._canvas.addEventListener('click', () => {
      this.pong.play();
    });
    this._canvas.addEventListener('mousemove', event => {
      const scale = event.offsetY / event.target.getBoundingClientRect().height;
      this.pong.players[0].pos.y = this._canvas.height * scale;
    });
  }

  setUp() {
    this.setUpCanvas();
    this.setUpMoveMove();
  }

  drawBoard() {
    this._context.fillStyle = '#000';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  drawHalfLine() {
    const width = this._canvas.width;
    const height = this._canvas.height;

    const size = {
      width: 10,
      height: 10
    }

    const mid = Math.floor(width / 2) - size.width / 2;
    const count = Math.floor(height / (size.height * 2));
    const offset = Math.floor((height % (size.height * 2)) / 2) + size.height / 2;

    // console.log('mid', mid);
    // console.log('count', count);
    // console.log('offset', offset);

    let position = {
      x: mid,
      y: offset,
    }

    this._context.fillStyle = '#ECC94B';
    for (let i = 0; i < count; i++) {
      this._context.fillRect(position.x, position.y, size.width, size.height);
      position.y += size.height * 2;
    }
  }

  drawRect(rect, color) {
    this._context.fillStyle = color || '#fff';
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
  }

  drawScore() {
    this.pong.players.forEach((player, index) => {
      this.score.draw(this._context, player.score, index);
    });
  }

  drawBall() {
    this.drawRect(this.pong.ball);
  }

  drawPlayers() {
    this.pong.players.forEach(player => this.drawRect(player));
  }

  draw() {
    this.clear();
    this.drawScore();
    this.drawPlayers();
    this.drawBall();
  }

  clear() {
    this.drawBoard();
    this.drawHalfLine();
  }

  start() {
    let lastTime = null;

    const frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.pong.update(diff / 1000);
        this.draw();
      }
      lastTime = millis;
      requestAnimationFrame(frameCallback);
    };

    requestAnimationFrame(frameCallback);
  }
}

export { Vector, Rect, Ball, Player, Pong, Canvas }