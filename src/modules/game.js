// eslint-disable-next-line import/no-cycle
import DOM from './dom';
import { Player, Computer } from '../factories/player';
// eslint-disable-next-line no-unused-vars
import Gameboard from '../factories/gameboard';

// Game handler module

const GAME = (() => {
  // Functions that sets up the game creating players and calling the board display
  let player;
  let PC;
  const setUpGame = () => {
    player = new Player('Player');
    PC = new Computer('AI');
    DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board);
    DOM.axisEventListener();
    DOM.placeShipEvent();
  };

  function makePCAttack() {
    const allMoves = DOM.getAllMoves();
    const index = PC.pickAIMove(allMoves);
    player.gameBoard.receiveAttack(index);
  }

  function checkWin() {
    if (player.gameBoard.haveAllShipsSunk()) {
      alert('AI Wins');
    } else if (PC.gameBoard.haveAllShipsSunk()) {
      alert('Player Wins');
    }
  }

  const makeAttack = (e) => {
    const index = e.target.getAttribute('index');
    PC.gameBoard.receiveAttack(index);
    makePCAttack();
    DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board, true);
    checkWin();
  };

  const placeAIShips = () => {
    const allShipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < 5; i += 1) {
      const axisNumber = Math.floor(Math.random() * 2);
      let axis = '';
      if (axisNumber === 0) {
        axis = 'x';
      } else {
        axis = 'y';
      }
      let allShipSpots = PC.getAllShipSpots(PC.gameBoard.board);
      let startCoordinate = Math.floor(Math.random() * allShipSpots.length);
      let shipLength = allShipLengths[i];
      let locationArray = PC.gameBoard.createLocationArray(startCoordinate, shipLength, axis);
      if (!PC.gameBoard.checkCollisions(locationArray)) {
        PC.gameBoard.placeShip(locationArray);
        DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board);
      } else {
        let value = false;
        while (value === false) {
          allShipSpots = PC.getAllShipSpots(PC.gameBoard.board);
          startCoordinate = Math.floor(Math.random() * allShipSpots.length);
          shipLength = allShipLengths[i];
          locationArray = PC.gameBoard.createLocationArray(startCoordinate, shipLength, axis);
          if (!PC.gameBoard.checkCollisions(locationArray)) {
            PC.gameBoard.placeShip(locationArray);
            DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board);
            value = true;
          }
        }
      }
    }
    DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board, true);
  };

  const placeShipProcess = (startCoordinate, shipLength) => {
    const axis = DOM.getAxis();
    const locationArray = player.gameBoard.createLocationArray(startCoordinate, shipLength, axis);
    if (!player.gameBoard.checkCollisions(locationArray)) {
      player.gameBoard.placeShip(locationArray);
      DOM.updateBoards(player.gameBoard.board, PC.gameBoard.board);
      DOM.placeShipEvent();
      const totalShipArray = player.gameBoard.board.filter((cor) => cor.hasShip);
      if (totalShipArray.length === 17) {
        placeAIShips();
      }
      return true;
    // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  };

  return {
    setUpGame,
    placeShipProcess,
    makeAttack,
  };
})();

export default GAME;
