function Pipe() {
    this.w = 100;
    this.spacing = 300;
    this.left = WIDTH;
    this.right = this.left + this.w;
    this.top = random(HEIGHT / 9, HEIGHT / 1.5);
    this.bottom = this.top + this.spacing;
    this.velocity = 3;

    this.update = function () {
        this.updateValues();
        this.move();
    }

    this.updateValues = function () {
        this.right = this.left + this.w;
        this.bottom = this.top + this.spacing;
    }

    this.move = function () {
        this.left -= this.velocity;
    }

    this.draw = function () {
        image(pipeTopImg, this.left, this.top, this.w, -this.top)
        image(pipeBottomImg, this.left, this.bottom, this.w, HEIGHT - this.bottom)
    }

    this.offScreen = function () {
        return this.right < 0;
    }

}