//Genetic Algorithms Library

function nextGeneration(n, parent) {
    generation++;
    birds = [];

    for (let i = 0; i < n - 1; i++) {
        if (parent) {
            if (i == 0)
                //Keeping the parent from the previous generation
                birds.push(new Bird(i, parent));
            else {
                let mutated = mutate(parent, 0.3, 0.2);
                birds.push(new Bird(i, mutated));
            }
        }
        else {
            birds.push(new Bird(i));
        }
    }
}


// 312 in 65 gens

//Mutating Weights of a Brain
function mutate(brain, mutationRate, mutationStrength) {
    let mutated = copyBrain(brain);
    let hWeights = mutated.hiddenWeights;
    let oWeights = mutated.outputWeights;

    for (let i = 0; i < hWeights.length; i++) {
        for (let j = 0; j < hWeights[0].length; j++) {
            if (random() < mutationRate) {
                // hWeights[i][j] += (round(random()) * 2 - 1) * hWeights[i][j] * mutationStrength;
                hWeights[i][j] += randomGaussian(0, 0.2);
            }
        }
    }
    for (let i = 0; i < oWeights.length; i++) {
        for (let j = 0; j < oWeights[0].length; j++) {
            if (random() < mutationRate) {
                // oWeights[i][j] += (round(random()) * 2 - 1) * oWeights[i][j] * mutationStrength;
                oWeights[i][j] += randomGaussian(0, 0.2);
            }
        }
    }
    return mutated;
}

//Copying a brain
function copyBrain(brain) {
    let copy = JSON.parse(JSON.stringify(brain));
    let newBrain = new NeuralNetwork(copy.inNodes, copy.hNodes, copy.outNodes);
    newBrain.hiddenWeights = copy.hiddenWeights;
    newBrain.outputWeights = copy.outputWeights;
    return newBrain;
}