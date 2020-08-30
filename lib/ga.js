//Genetic Algorithms Library

function nextGeneration(parent) {
    generation++;
    birds = [];

    for (let i = 0; i < nBirds; i++) {
        if (parent) {
            if (i == 0)
                //Keeping the parent from the previous generation
                birds.push(new Bird(i, parent));
            else {
                //Pushing birds with random NN to prevent
                //getting stuck with bad NN
                if (i >= nBirds - (nBirds / 5)){
                    birds.push(new Bird(i))
                }
                else {
                    let mutated = mutate(parent, 0.3, 0.2);
                    birds.push(new Bird(i, mutated));
                }
            }
        }
        else {
            birds.push(new Bird(i));
        }
    }
}


//Mutating Weights of a Brain
function mutate(brain, mutationRate, mutationStrength) {
    let mutated = copyBrain(brain);
    let hWeights = mutated.hiddenWeights;
    let oWeights = mutated.outputWeights;

    for (let i = 0; i < hWeights.length; i++) {
        for (let j = 0; j < hWeights[0].length; j++) {
            if (random() < mutationRate) {
                // hWeights[i][j] += (round(random()) * 2 - 1) * hWeights[i][j] * mutationStrength;
                hWeights[i][j] += randomGaussian(0, mutationStrength);
            }
        }
    }
    for (let i = 0; i < oWeights.length; i++) {
        for (let j = 0; j < oWeights[0].length; j++) {
            if (random() < mutationRate) {
                // oWeights[i][j] += (round(random()) * 2 - 1) * oWeights[i][j] * mutationStrength;
                oWeights[i][j] += randomGaussian(0, mutationStrength);
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