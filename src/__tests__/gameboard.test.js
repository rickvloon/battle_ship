/* eslint-disable no-undef */
import Gameboard from '../factories/gameboard';
import Ship from '../factories/ship';

describe('Gameboard functions test', () => {
  let gameboard;
  let testboard;
  let ship1;
  let value;
  beforeEach(() => {
    gameboard = new Gameboard();
    ship1 = new Ship(3, [1, 2, 3]);
  });
  it('Creates a gameboard object', () => {
    testboard = [];
    for (let i = 0; i < 100; i += 1) {
      testboard.push({ hasShip: false, isHit: false, ship: null });
    }
    expect(gameboard.board).toEqual(testboard);
  });
  it('Receives an attack', () => {
    gameboard.board[1].ship = ship1;
    gameboard.board[1].hasShip = true;
    gameboard.receiveAttack(1);
    expect(gameboard.board[1].isHit).toBe(true);
    expect(gameboard.board[1].ship.hitSpots).toEqual([1]);
  });
  it('Creates a location array on x-axis', () => {
    expect(gameboard.createLocationArray(5, 3, 'x')).toEqual([5, 6, 7]);
  });
  it('Creates a location array on y-axis', () => {
    expect(gameboard.createLocationArray(5, 3, 'y')).toEqual([5, 15, 25]);
  });
  it('Checks for a collision', () => {
    gameboard.board[1].hasShip = true;
    expect(gameboard.checkCollisions([1, 2, 3])).toBe(true);
    expect(gameboard.checkCollisions([1, 2, 3, 100])).toBe(true);
    expect(gameboard.checkCollisions([89, 90, 91])).toBe(true);
    expect(gameboard.checkCollisions([87, 88, 89])).toBe(false);
  });
  it('Places and creates a ship', () => {
    gameboard.placeShip([1, 2, 3]);
    expect(gameboard.board[1].ship).toStrictEqual(ship1);
  });
  it('Pushes ship to ship list', () => {
    gameboard.placeShip([1, 2, 3]);
    expect(gameboard.ships[0]).toStrictEqual(ship1);
  });
  it('Tells if all ships have sunk', () => {
    gameboard.placeShip([1, 2, 3]);
    gameboard.placeShip([4, 5, 6]);
    expect(gameboard.haveAllShipsSunk()).toBe(false);
    gameboard.ships[0].hitSpots = [1, 2, 3];
    gameboard.ships[1].hitSpots = [4, 5, 6];
    expect(gameboard.haveAllShipsSunk()).toBe(true);
  });

  describe('Whole ship placing process', () => {
    beforeEach(() => {
      gameboard.createLocationArray(3, [1, 2, 3], 'x');
      value = gameboard.checkCollisions([1, 2, 3]);
      if (!value) {
        gameboard.placeShip([1, 2, 3]);
      }
    });
    it('Created the ship', () => {
      expect(gameboard.board[1].hasShip).toBe(true);
      expect(gameboard.board[1].ship.isSunk()).toBe(false);
    });
    it('Takes a hit and updates all the board ships', () => {
      gameboard.receiveAttack(1);
      expect(gameboard.board[1].ship.hitSpots).toStrictEqual([1]);
      expect(gameboard.board[2].ship.hitSpots).toStrictEqual([1]);
      expect(gameboard.board[3].ship.hitSpots).toStrictEqual([1]);
    });
  });
});
