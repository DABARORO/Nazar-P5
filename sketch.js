let player;
let obstacles = [];
let groundObstacles = [];
let coins = [];
let score = 0;
let money = 0;
let gameState = "PLAY";
let playerImg;

// Paramètres de difficulté
let gameSpeed = 5;
let difficultyFactor = 1;

function preload() {
  playerImg = loadImage("DialogueBarry0.png");
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
}

function draw() {
  background(20, 20, 40);

  if (gameState === "PLAY") {
    // Augmentation de la difficulté
    difficultyFactor += 0.0005;
    gameSpeed = 5 * difficultyFactor;

    drawEnvironment();
    player.update();
    player.show();

    // Fréquence d'apparition dynamique
    let spawnRate = max(30, floor(90 / difficultyFactor));

    if (frameCount % spawnRate === 0) {
      if (random() > 0.4) {
        obstacles.push(new Laser(gameSpeed));
      } else {
        groundObstacles.push(new Mine(gameSpeed));
      }
    }

    if (frameCount % 40 === 0) coins.push(new Coin(gameSpeed));

    // Gestion des objets (Pièces et Obstacles)
    handleObjects(coins, player, true);
    handleObjects(obstacles, player, false);
    handleObjects(groundObstacles, player, false);

    score++;
    displayUI();
  } else {
    drawGameOver();
  }
}

// --- GESTION DES OBJETS ---
function handleObjects(array, p, isCoin) {
  for (let i = array.length - 1; i >= 0; i--) {
    array[i].update();
    array[i].show();

    if (array[i].hits(p)) {
      if (isCoin) {
        money++;
        array.splice(i, 1);
      } else {
        gameState = "GAMEOVER";
      }
    } else if (array[i].offscreen()) {
      array.splice(i, 1);
    }
  }
}

// --- CLASSE JOUEUR (PHYSIQUE RÉTABLIE) ---
class Player {
  constructor() {
    this.x = 80;
    this.y = 200;
    this.w = 60;
    this.h = 60;
    // RETOUR AUX VALEURS PRÉCÉDENTES :
    this.gravity = 0.25;
    this.lift = -0.6;
    this.velocity = 0;
  }

  show() {
    if (playerImg) image(playerImg, this.x, this.y, this.w, this.h);

    if (mouseIsPressed && this.y > 0) {
      fill(255, 150, 0, 200);
      noStroke();
      // Flamme du jetpack réactive
      ellipse(this.x + 15, this.y + this.h, random(15, 25), random(25, 45));
    }
  }

  update() {
    if (mouseIsPressed) {
      this.velocity += this.lift;
    }
    this.velocity += this.gravity;
    this.velocity *= 0.97; // Friction d'origine
    this.y += this.velocity;

    // Contraintes de bordures
    if (this.y > height - this.h - 20) {
      this.y = height - this.h - 20;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

// --- OBSTACLES ET BONUS ---

class Laser {
  constructor(speed) {
    this.x = width;
    this.y = random(height * 0.15, height * 0.75); // Danger au milieu
    this.w = random(120, 220);
    this.h = 12;
    this.speed = speed;
  }
  update() {
    this.x -= this.speed;
  }
  show() {
    fill(255, 50, 50);
    rect(this.x, this.y, this.w, this.h, 5);
    if (frameCount % 4 === 0) {
      stroke(255);
      line(this.x, this.y + 6, this.x + this.w, this.y + 6);
      noStroke();
    }
  }
  hits(p) {
    return (
      p.x < this.x + this.w &&
      p.x + p.w > this.x &&
      p.y < this.y + this.h &&
      p.y + p.h > this.y
    );
  }
  offscreen() {
    return this.x < -this.w;
  }
}

class Mine {
  constructor(speed) {
    this.x = width;
    this.y = height - 40;
    this.size = 35;
    this.speed = speed;
  }
  update() {
    this.x -= this.speed;
  }
  show() {
    fill(0);
    stroke(255, 0, 0);
    ellipse(this.x, this.y, this.size);
    noStroke();
  }
  hits(p) {
    return (
      dist(p.x + p.w / 2, p.y + p.h / 2, this.x, this.y) < this.size / 2 + 15
    );
  }
  offscreen() {
    return this.x < -50;
  }
}

class Coin {
  constructor(speed) {
    this.x = width;
    this.y = random(50, height - 100);
    this.size = 20;
    this.speed = speed;
  }
  update() {
    this.x -= this.speed;
  }
  show() {
    fill(255, 215, 0);
    ellipse(this.x, this.y, this.size);
  }
  hits(p) {
    return (
      dist(this.x, this.y, p.x + p.w / 2, p.y + p.h / 2) < this.size / 2 + 25
    );
  }
  offscreen() {
    return this.x < -20;
  }
}

// --- INTERFACE ---

function drawEnvironment() {
  stroke(100);
  line(0, height - 20, width, height - 20);
  noStroke();
}

function displayUI() {
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text(`Distance: ${floor(score / 10)}m`, 20, 30);
  fill(255, 215, 0);
  text(`Argent: ${money}$`, 20, 55);
  fill(100, 255, 100);
  text(`Vitesse: x${difficultyFactor.toFixed(2)}`, 20, 80);
}

function drawGameOver() {
  background(0, 200);
  textAlign(CENTER);
  fill(255, 0, 0);
  textSize(50);
  text("FIN DE MISSION", width / 2, height / 2 - 20);
  fill(255);
  textSize(20);
  text(
    `Score: ${floor(score / 10)}m | Butin: ${money}$`,
    width / 2,
    height / 2 + 30,
  );
  text("Clique pour rejouer", width / 2, height / 2 + 80);
}

function mousePressed() {
  if (gameState === "GAMEOVER") {
    obstacles = [];
    groundObstacles = [];
    coins = [];
    score = 0;
    money = 0;
    difficultyFactor = 1;
    gameSpeed = 5;
    player = new Player();
    gameState = "PLAY";
  }
}
