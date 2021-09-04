/* eslint-disable no-undef */
import { Player, Computer } from '../factories/player';
import Gameboard from '../factories/gameboard';

describe('Player functions tesing', () => {
  let player1;
  let gameboard;
  let PC;
  beforeEach(() => {
    player1 = new Player('Rick');
    gameboard = new Gameboard();
    PC = new Computer('PC');
  });
  it('Creates the object', () => {
    expect(player1.name).toBe('Rick');
    expect(player1.turn).toBe(true);
    expect(player1.gameBoard.board).toEqual(gameboard.board);
  });
  it('PC returns all valuable moves', () => {
    expect(PC.getAllMoves(player1.gameBoard)).toEqual(gameboard.board);
  });
  it('PC returns all valuable moves', () => {
    for (let i = 0; i < 99; i += 1) {
      player1.gameBoard.board[i].isHit = true;
    }
    // eslint-disable-next-line max-len
    expect(PC.getAllMoves(player1.gameBoard)).toEqual([{ hasShip: false, isHit: false, ship: null }]);
  });
  it('Attacks a random spot', () => {
    PC.pickAIMove([0, 1, 2, 3, 4]);
  });
});
