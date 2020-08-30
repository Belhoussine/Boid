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
let b;

//Parameters
let WIDTH;
let HEIGHT;
let pipeSpacing;
let nBirds;
let speed;
let speedSlider;
let nBirdsSlider
let saveButton;
let loadButton;
let loadLabel;
let saveLink;
let speedLabel;
let nBrirdsSliderLabel;

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
    WIDTH = windowWidth - 0;
    HEIGHT = windowHeight - 130;
    createCanvas(WIDTH, HEIGHT);
    speedLabel = createP('<b>Learning Speed</b>')
    nBrirdsSliderLabel = createP('<b>Birds per Generation</p>')
    loadLabel = createP('<b>Load Bird (JSON):</b>')
    speedSlider = createSlider(2, 100, 2);
    nBirdsSlider = createSlider(1, 300, 150, 1);
    saveButton = createButton('Save Best Bird');
    loadButton = createInput('Load Bird');
    loadButton.elt.type = 'file';
    loadButton.elt.id = 'json-file';
    loadButton.elt.accept = 'application/JSON';
    loadButton.elt.onchange = loadBird;
    saveLink = createA('', 'Save Best Bird');
    saveLink.elt.hidden = true;
    saveButton.elt.onclick = saveBestBird;

    speedLabel.position(20, HEIGHT + 10);
    nBrirdsSliderLabel.position(195, HEIGHT + 10);
    loadLabel.position(20, HEIGHT + 58);
    speedSlider.position(0, HEIGHT);
    nBirdsSlider.position(200, HEIGHT);
    saveButton.position(430, HEIGHT + 10);
    loadButton.position(195, HEIGHT + 70);

    birds = []
    pipes = []
    generation = 0;
    score = 0;
    bestScore = 0;
    nBirds = nBirdsSlider.value();
    pipeSpacing = 75;
    time = 0;
    nextGeneration();
    speed = speedSlider.value();
    frameRate(30);
}

function draw() {
    nBirds = nBirdsSlider.value();
    speed = speedSlider.value();
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
    birdsAlive = 0;
    // Updating birds that are alive
    for (let bird of birds) {
        if (bird.alive) {
            allDead = false;
            birdsAlive++;
            bird.update();
            bestBird = bird;
            if (pipes[0])
                bird.think();
        }
    }
    // Restart game when all birds die
    if (allDead) {
        bestBirds.push(bestBird);
        if (bestBirds.length > 3)
            bestBirds.shift();

        let bestBrain = copyBrain(bestBird.brain);
        restart();
        nextGeneration(bestBrain);
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
    if (pipes[0] && pipes[0].right - round(WIDTH / 8) <= 7 && pipes[0].right - round(WIDTH / 8) >= 0) {
        score++;
        bestScore = max(score, bestScore);
    }
    return score;
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

function reset() {
    restart();
    bestScore = 0;
    generation = 0;
}

function saveBestBird() {
    let currentBest = bestBirds[bestBirds.length - 1];
    let best = currentBest || { timeAlive: 0 };

    for (let bird of birds) {
        if (best.timeAlive < bird.timeAlive) {
            best = bird;
        }
    }
    download(JSON.stringify(best), "BestBird_Gen" + best.generation + "_Id" + best.id + ".json", "text/plain")
}

async function loadBird() {
    noLoop();
    let parentFile = await loadButton.elt.files[0].text();
    if (isJSON(parentFile)) {
        let parent = JSON.parse(parentFile);
        let parentBrain = copyBrain(parent.brain)
        reset();
        nextGeneration(parentBrain);
    }
    loop();
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function backgroundImg() {
    background(0);
    imageMode(CORNER);
    image(skyImg, 0, 0, WIDTH, HEIGHT);
}

function keyPressed() {
    if (key === 'r') {
        reset();
        nextGeneration();
        loop();
    }

    if (key === 's') {
        saveBestBird();
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

function download(content, fileName, contentType) {
    const file = new Blob([content], { type: contentType });
    saveLink.elt.href = URL.createObjectURL(file);
    saveLink.elt.download = fileName;
    saveLink.elt.click();
}
