// Images
let birdImg;
let skyImg;
let pipeTopImg;
let pipeBottomImg;

// Environment and Elements
let birds;
let pipes;
let bestBird;
let bestBirds = [];

//Parameters
let WIDTH;
let HEIGHT;
let pipeSpacing;
let nBirds;
let speed;
let slider;

//Evolution tracking
let time;
let score;
let bestScore;
let generation;
let birdsAlive;

function preload() {
    birdImg = loadImage('./images/bird.png');
    skyImg = loadImage('./images/sky.png');
    pipeTopImg = loadImage('./images/pipeTop.png');
    pipeBottomImg = loadImage('./images/pipeBottom.png');
}

function setup() {
    WIDTH = windowWidth - 10;
    HEIGHT = windowHeight - 30;
    createCanvas(WIDTH, HEIGHT);
    generation = 0;
    score = 0;
    bestScore = 0;
    birds = []
    pipes = []
    nBirds = 200;
    pipeSpacing = 150;
    time = 0;
    nextGeneration(nBirds);
    slider = createSlider(2, 100, 10);
    speed = slider.value();
    frameRate(30);
}

function draw() {
    speed = slider.value();
    for (let i = 0; i < speed; i++) {
        generatePipes();
        updatePipes();
        updateBirds();
        getScore();
        time++;
    }

    //The drawing
    backgroundImg();
    showBirds();
    showPipes();
    showScoreBoard();
}

//Random Jumping 
function updateBirds() {
    let allDead = true;
    let closestPipes;
    birdsAlive = 0;
    // Updating birds that are alive
    for (let bird of birds) {
        if (bird.alive) {
            birdsAlive++;
            allDead = false;
            bestBird = bird;
            if (pipes[0]) {
                bird.think();
            }
        }
        bird.update();
    }
    // Restart game when all birds die
    if (allDead) {
        bestBirds.push(bestBird);
        if (bestBirds.length > 10)
            bestBirds.shift();

        let bestBrain = copyBrain(bestBird.brain);
        restart();
        nextGeneration(nBirds, bestBrain);
        return;
    }
}

function showBirds() {
    for (let bird of birds) {
        if (bird.alive)
            bird.draw();
    }
}

function generatePipes() {
    // Add pipe on the right of the screen
    if (time % pipeSpacing == 0) {
        pipes.push(new Pipe());
    }
}

function updatePipes() {
    //Move pipes and handle collisions
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        if (pipes[i].offScreen()) {
            pipes.shift();
        }
        // Handling collisions
        for (let bird of birds) {
            if (bird.hitsPipe(pipes[i])) {
                bird.die();
            }
        }
    }
}

function showPipes() {
    for (let pipe of pipes) {
        pipe.draw();
    }
}


function getScore() {
    if (pipes[0] && abs(pipes[0].right - round(WIDTH / 8)) <= 1) {
        bestScore = max(score, bestScore);
        score++;
        return;
    }
}

function showScoreBoard() {
    textSize(20);
    textStyle(BOLD);
    text('🌐 Generation: ' + generation, WIDTH - 230, 40);
    text('💪 Score: ' + score, WIDTH - 230, 75);
    text('🐥 Birds: ' + birdsAlive, WIDTH - 230, 110);
    textSize(16);
    text('Best Score: ' + bestScore, WIDTH / 2 - 70, HEIGHT - 15)
}

function restart() {
    score = 0;
    birds = []
    pipes = []
    time = 0;
}

function backgroundImg() {
    background(0);
    imageMode(CORNER);
    image(skyImg, 0, 0, WIDTH, HEIGHT);
}

function keyPressed() {
    if (key === 'r') {
        restart();
        nextGeneration(nBirds);
        loop();
    }

    if (key === ' ') {
        if (isLooping()) {
            noLoop();
        }
        else {
            loop();
        }
    }
}