/* eslint-disable class-methods-use-this */
import Ship from './ship';

// Gameboard object creation

class Gameboard {
  constructor(board) {
    this.board = board || [];
    this.ships = [];
    if (!this.board.length) this.init();
  }

  init() {
    for (let i = 0; i < 100; i += 1) {
      this.board.push({ hasShip: false, isHit: false, ship: null });
    }
  }

  createLocationArray(startCoordinate, length, axis) {
    const locationArray = [];
    for (let i = 0; i < length; i += 1) {
      if (axis === 'x') {
        locationArray.push(startCoordinate + i);
      } else {
        locationArray.push(startCoordinate + i * 10);
      }
    }
    return locationArray;
  }

  checkCollisions(locationArray) {
    const collisionArray = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    // Check for exceeding the limit
    if (locationArray.some((loc) => !this.board[loc])) {
      return true;
    } if (locationArray.some((loc) => this.board[loc].hasShip)) {
      return true;
    // eslint-disable-next-line max-len
    } if (collisionArray.some((num) => [num, num + 1].every((combination) => locationArray.includes(combination)))) {
      return true;
    // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  }

  placeShip(locationArray) {
    const ship = new Ship(locationArray.length, locationArray);
    this.ships.push(ship);
    for (let i = 0; i < locationArray.length; i += 1) {
      this.board[locationArray[i]].hasShip = true;
      this.board[locationArray[i]].ship = ship;
    }
  }

  receiveAttack(coordinate) {
    this.board[coordinate].isHit = true;
    if (this.board[coordinate].hasShip) {
      this.board[coordinate].ship.hit(coordinate);
      if (this.board[coordinate].ship.isSunk()) {
        this.board[coordinate].ship.hasSunk = true;
      }
    }
  }

  haveAllShipsSunk() {
    if (this.ships.every((ship) => ship.isSunk())) {
      return true;
    // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  }
}

export default Gameboard;
