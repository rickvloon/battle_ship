/* eslint-disable no-undef */
import Ship from '../factories/ship';

describe('Ship functions tests', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(4);
  });
  it('Creates a ship object', () => {
    expect(ship.length).toEqual(4);
    expect(ship.hitSpots).toEqual([]);
  });
  it('Takes a hit', () => {
    ship.hit(5);
    expect(ship.hitSpots).toEqual([5]);
  });
  it('Checks if ship is sunk', () => {
    ship.coordinates = [2, 3, 4];
    expect(ship.isSunk()).toBe(false);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit(3);
    ship.hit(4);
    expect(ship.isSunk()).toBe(true);
  });
});
