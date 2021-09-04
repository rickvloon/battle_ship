/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import Gameboard from './gameboard';

// Player object creation

class Player {
  constructor(name) {
    this.name = name;
    this.turn = true;
    this.gameBoard = new Gameboard();
  }

  fireShot(coordinate, board) {
    board.receiveAttack(coordinate);
  }
}

class Computer extends Player {
  pickAIMove(allLegalCords) {
    const index = Math.floor(Math.random() * allLegalCords.length);
    return allLegalCords[index].getAttribute('index');
  }

  getAllShipSpots(pcBoard) {
    const allShipSpots = pcBoard.filter((cor) => !cor.hasShip);
    return allShipSpots;
  }
}

export { Player, Computer };
