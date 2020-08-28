function NeuralNetwork(i, h, o, hw, ow) {
    this.inNodes = i;
    this.hNodes = h;
    this.outNodes = o;
    this.hiddenWeights = []
    this.outputWeights = []
    this.hiddenNeurons = []
    this.outputNeurons = []


    this.generateHiddenWeights = function () {
        for (let i = 0; i < this.hNodes; i++) {
            this.hiddenWeights[i] = []
            for (let j = 0; j < this.inNodes; j++) {
                this.hiddenWeights[i][j] = random(-1, 1);
            }
        }
    }

    this.generateOutputWeights = function () {
        for (let i = 0; i < this.outNodes; i++) {
            this.outputWeights[i] = []
            for (let j = 0; j < this.hNodes; j++) {
                this.outputWeights[i][j] = random(-1, 1);
            }
        }
    }

    this.think = function (inputs) {
        this.hiddenNeurons = this.sigmoid(this.matmul(this.hiddenWeights, inputs));
        this.outputNeurons = this.sigmoid(this.matmul(this.outputWeights, this.hiddenNeurons));
        return this.outputNeurons;
    }

    this.matmul = function (A, B) {
        let h = A.length;
        let w = B[0].length;

        let matrix = [];
        for (let i = 0; i < h; i++) {
            matrix[i] = [];
            for (let j = 0; j < w; j++) {
                matrix[i][j] = 0
                for (let k = 0; k < A[0].length; k++) {
                    matrix[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return matrix;
    }

    this.sigmoid = function (vec) {
        let activated = []
        for (let i = 0; i < vec.length; i++) {
            let curr = vec[i];
            activated[i] = [1 / (1 + exp(-curr))];
        }
        return activated;
    }

    this.softmax = function (vec) {
        let activated = []

        for (let i = 0; i < vec.length; i++) {
            let curr = vec[i];
            activated[i] = exp(curr);
        }
        let sum = activated.reduce((a, b) => a + b, 0);
        for (let i = 0; i < vec.length; i++) {
            activated[i] = activated[i] / sum;
        }

        return activated;
    }

    this.generateHiddenWeights();
    this.generateOutputWeights();
}   