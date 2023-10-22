# CanvasME

**CanvasME** is an innovative online Pictionary platform developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js). This engaging platform provides users with an immersive gaming experience centered around the classic game of Pictionary.

## Functionality

### Game Modes

1. **1 vs 1**
   - Users are randomly paired to compete.
   - Winners are determined based on the best out of 3 rounds.

2. **Team Battle**
   - Users can form two teams and engage in a battle.
   - The first team to win a game of 5 rounds emerges victorious.

### User Interaction

- **Registration and Authentication**
  - Users need to register and log in to play and compete.

- **Roles in the Game**
  - Players are assigned roles as either the drawer or the guesser.
  - The drawer, presented with a canvas and a specific topic, has a limited time to draw.
  - The guesser has 3 attempts to guess the drawn topic.

- **Points and Ranking**
  - For each round won, the guesser earns points.
  - User points contribute to player rankings on the leaderboard.

## Database

The database serves as a crucial component for storing user data and tracking user progression within the game. It includes a base template to initiate game instances.

## Web Sockets

CanvasME leverages web sockets for real-time communication between players during Pictionary games. Users can directly observe each other's drawings and guesses in real time, enhancing the interactive gaming experience.

## Structure

- **Frontend**: Developed in Angular.
- **Backend**: Developed in Node.js with Express.js.
- **Architecture**: Adopts the Model-View-Controller (MVC) architecture.
- **Main Classes**: Classes include 'User,' 'Game,' 'Home,' etc.
- **Functions, Components, and Services**: These elements are dynamically created and expanded according to the project's requirements.

## Planned Work

### Resources

- **Hardware**: Laptop
- **Software**:
  - Node.js
  - Express.js
  - Angular Framework
  - MongoDB
  - Websockets (Socket.io)

## Conclusion

CanvasME stands as an exciting online gaming platform that leverages modern web technologies to bring the classic game of Pictionary to a virtual setting. With planned features and a well-structured development approach, CanvasME aims to provide users with a rich and interactive gaming experience.
