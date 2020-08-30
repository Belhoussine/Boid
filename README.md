# Boid


> **- This is a Neuroevolution [simulation](https://boid.belhoussine.com) that combines both Neural Networks and Genetic Algorithms to play the game *Flappy Bird***.  
**- It takes about 20 generations for the boid to become good at the game, and about 50 to master it.**  
**- The simulation speed and birds per generation can be adjusted using the sliders at the bottom left of the page.**  
**- Well performing boids can be saved and loaded into the game.**

> Link: [Boid](https://boid.belhoussine.com)
---------------

![Boid GIF](images/demo.gif)

## Implement a *Flappy Bird* clone
- [x] **Boid class**:
    - [x] Gravity
    - [x] Y-velocity
    - [x] Jump on Key Pressed
    - [x] Die on collision
    - [x] Boid image
    - [ ] Change head pointing position while flying

- [x] **Pipe class**:
    - [x] Two Rectangles
    - [x] X-velocity
    - [x] Spacing 
    - [x] Pipe Image

- [x] **Create Environment**:
    - [x] Create World
    - [x] Create Boid
    - [x] Create Pipes
    - [x] Handle collisions
    - [x] Background Image
    - [x] Make a Scoreboard 
    - [x] Track generations

## Implement a *Neural Network* 
- [x] Design NN Architecture (10/10/2 vs 6/10/2)
- [x] Create Layers
- [x] Randomize weights
- [x] Add activation functions
- [x] Copy Neural Network function
- [x] Predict / Think function
- [x] Save NN of boid with Best Fitness in JSON format
- [x] Load NN from JSON and assign it to a boid

## Implement a *Genetic Algorithm*
- [x] Create a Generation of Boids
- [x] Implement Mutate function
- [ ] Implement a Crossover function
- [x] Copy NN with best fitness
- [x] Create a generation of mutated boids from best NN
- [x] Create a slider for learning speed
- [x] Store boids with best Fitness from every generation

**NOTE**: It is recommended to have at least 100 boids per generation for a faster training.