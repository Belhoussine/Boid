function Bird(id, brain) {
    this.id = id;
    this.alive = true;
    this.timeAlive = 0;
    this.epsilon = 10;
    this.x = WIDTH / 8;
    this.y = HEIGHT / 2;
    this.left = this.x - this.size / 2;
    this.right = this.x + this.size / 2;
    this.top = this.y - this.size / 2 + this.epsilon;
    this.bottom = this.y + this.size / 2;
    this.size = 50;
    this.velocity = 0;
    this.gravity = 0.5;
    this.lift = -15;
    
    if (brain)
        this.brain = brain;
    else
        this.brain = new NeuralNetwork(6, 10, 2);

    this.move = function () {

        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.hitsBottom()) {
            this.y = HEIGHT - this.size / 2;
            this.stopMoving();
        }
        else if (this.hitsTop()) {
            this.y = this.size / 2;
            this.stopMoving();
        }
    }

    this.jump = function () {
        this.y -= 1;
        this.velocity += this.lift;
    }

    this.think = function () {
        let closestPipes = this.getClosestPipes();
        let closestPipe = closestPipes[0];
        let nextPipe = closestPipes[1];
        let environment = [
            [this.y / HEIGHT],
            [this.velocity / 10],
            [closestPipe.top / HEIGHT],
            [closestPipe.bottom / HEIGHT],
            [closestPipe.left / WIDTH],
            [closestPipe.right / WIDTH],
            [nextPipe.top / HEIGHT],
            [nextPipe.bottom / HEIGHT],
            [nextPipe.left / WIDTH],
            [nextPipe.right / WIDTH]
        ];

        let decision = this.brain.think(environment);
        if (decision[0][0] > decision[1][0])
            this.jump();
    }

    this.update = function () {
        this.updateValues();
        this.move();
    }

    this.updateValues = function () {
        this.left = this.x - this.size / 2;
        this.right = this.x + this.size / 2;
        this.top = this.y - this.size / 2 + this.epsilon;
        this.bottom = this.y + this.size / 2;
        this.timeAlive += 1;
    }

    this.draw = function () {
        textSize(20);
        text(this.id, this.x - this.size / 2, this.y - this.size / 2)
        
        image(birdImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size * 1.2);
    }

    this.hitsTop = function () {
        return (this.top <= 0);
    }

    this.hitsBottom = function () {
        return (this.bottom >= HEIGHT);
    }

    this.hitsPipe = function (pipe) {
        if (this.top <= pipe.top || this.bottom >= pipe.bottom) {
            if (this.right >= pipe.left && this.right <= pipe.right) {
                return true;
            }
            if (this.left <= pipe.right && this.left >= pipe.left) {
                return true;
            }
        }
        return false;
    }

    this.stopMoving = function () {
        this.velocity = 0;
    }

    this.die = function () {
        this.alive = false;
    }

    this.getClosestPipes = function() {
        let birdPos = this.x;
        let pipe1 = pipes[0], pipe2 = pipes[1] || 0, pipe3 = pipes[2] || 0;
        let dist1 = pipe1.right - birdPos;
    
        return dist1 >= 0 ? [pipe1, pipe2,1] : [pipe2, pipe3];
    }
}