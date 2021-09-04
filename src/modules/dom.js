/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
// Module for DOM manipulation;

// eslint-disable-next-line import/no-cycle
import GAME from './game';

const DOM = (() => {
  const playerBoardDiv = document.getElementById('player-board');
  const computerBoardDiv = document.getElementById('computer-board');
  const updateBoards = (playerBoard, computerBoard, val) => {
    playerBoardDiv.innerHTML = '';
    computerBoardDiv.innerHTML = '';
    playerBoard.forEach((square, index) => {
      if (square.hasShip && square.isHit) {
        playerBoardDiv.innerHTML += `<div class="player-hitsquare-ship" index="${index}"></div>`;
      } else if (square.hasShip) {
        playerBoardDiv.innerHTML += `<div class="player-square-ship" index="${index}"></div>`;
      } else if (square.isHit) {
        playerBoardDiv.innerHTML += `<div class="player-hitsquare-empty" index="${index}"></div>`;
      } else {
        playerBoardDiv.innerHTML += `<div class="player-square-empty" index="${index}"></div>`;
      }
    });
    computerBoard.forEach((square, index) => {
      if (square.hasShip && square.isHit) {
        computerBoardDiv.innerHTML += `<div class="computer-hitsquare-ship" index="${index}"></div>`;
      } else if (square.isHit) {
        computerBoardDiv.innerHTML += `<div class="computer-hitsquare-empty" index="${index}"></div>`;
      } else {
        computerBoardDiv.innerHTML += `<div class="computer-square-empty" index="${index}"></div>`;
      }
    });
    if (val) {
      const emptyPCSquares = document.querySelectorAll('.computer-square-empty');
      emptyPCSquares.forEach((square) => square.addEventListener('click', GAME.makeAttack));
    }
  };

  const axisButton = document.getElementById('axis-button');
  const ships = document.querySelectorAll('.ship');
  const shipContainerSquares = document.querySelectorAll('.square-ship-place');
  const axisEventListener = () => {
    axisButton.addEventListener('click', (e) => {
      const value = e.target.getAttribute('value');
      if (value === 'x') {
        e.target.setAttribute('value', 'y');
        e.target.textContent = 'Y - AXIS';
        ships.forEach((ship) => ship.style.flexDirection = 'column');
        shipContainerSquares.forEach((square) => square.style.marginBottom = '10px');
      } else {
        e.target.setAttribute('value', 'x');
        e.target.textContent = 'X - AXIS';
        ships.forEach((ship) => ship.style.flexDirection = 'row');
        shipContainerSquares.forEach((square) => square.style.marginRight = '10px');
      }
    });
  };

  const getAxis = () => axisButton.getAttribute('value');

  // Drag and drop functions

  function dragStart() {
    setTimeout(() => (this.className = 'invisible'), 0);
    this.setAttribute('id', 'dragging');
  }

  function dragEnd() {
    this.className = 'ship';
    this.removeAttribute('id', 'dragging');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.className = 'hovered-square';
  }

  function dragLeave() {
    this.className = 'player-square-empty';
  }

  function dragDrop() {
    // Styling
    const dragging = document.getElementById('dragging');
    const shipLength = dragging.getAttribute('length');

    // Logic
    let index = this.getAttribute('index');
    index = parseFloat(index);
    const check = GAME.placeShipProcess(index, shipLength);
    if (check) {
      this.append(dragging);
      this.innerHTML = '';
      dragging.removeAttribute('id');
    } else {
      this.className = 'player-square-empty';
    }
  }

  // Events adding for ship dragging
  const placeShipEvent = () => {
    const placingShips = document.querySelectorAll('.ship');
    const emptySquares = document.querySelectorAll('.player-square-empty');
    placingShips.forEach((ship) => {
      ship.addEventListener('dragstart', dragStart);
      ship.addEventListener('dragend', dragEnd);
    });
    // Loop trough the empty squares adding drag functions
    emptySquares.forEach((square) => {
      square.addEventListener('dragover', dragOver);
      square.addEventListener('dragenter', dragEnter);
      square.addEventListener('dragleave', dragLeave);
      square.addEventListener('drop', dragDrop);
    });
  };

  const getAllMoves = () => {
    const { children } = playerBoardDiv;
    const availableSquares = Array.from(children);
    const allMoves = availableSquares.filter((square) => square.getAttribute('class') !== 'player-hitsquare-empty');
    return allMoves;
  };

  return {
    updateBoards,
    axisEventListener,
    getAxis,
    placeShipEvent,
    getAllMoves,
  };
})();

export default DOM;
