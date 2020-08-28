# Boid

>**This is a Neuroevolution [simulation](https://boid.belhoussine.com) that combines both Neural Networks and Genetic Algorithms to play the game *Flappy Bird*.
It takes about 50 generations for the bird to become good at the game, and about 100 to master it.
The simulation speed can be adjusted using the slider at the bottom left of the page.** 

>Link: [Boid](https://boid.belhoussine.com)
---------------

![Boid GIF](images/demo.gif)

## Implement a *Flappy Bird* clone
- [x] **Bird class**:
    - [x] Gravity
    - [x] Y-velocity
    - [x] Jump on Key Pressed
    - [x] Die on collision
    - [x] Bird image
    - [ ] Change head pointing position while flying

- [x] **Pipe class**:
    - [x] Two Rectangles
    - [x] X-velocity
    - [x] Spacing 
    - [x] Pipe Image

- [x] **Create Environment**:
    - [x] Create World
    - [x] Create Bird
    - [x] Create Pipes
    - [x] Handle collisions
    - [x] Background Image
    - [x] Make a Scoreboard 
    - [x] Track generations

## Implement a *Neural Network* 
- [x] Design NN Architecture (10 - 10 - 2)
- [x] Create Layers
- [x] Randomize weights
- [x] Add activation functions
- [x] Copy Neural Network function
- [x] Predict / Think function

## Implement a *Genetic Algorithm*
- [x] Create a Generation of Birds
- [x] Implement Mutate function
- [ ] Implement a Crossover function
- [x] Copy NN with best fitness
- [x] Create a generation of mutated birds from best NN
- [x] Create a slider for learning speed
- [x] Store birds with best Fitness from every generation