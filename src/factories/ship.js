// Ship object creation

class Ship {
  constructor(length, coordinates) {
    this.length = length;
    this.coordinates = coordinates;
    this.hitSpots = [];
    this.hasSunk = false;
  }

  hit(coordinate) {
    this.hitSpots.push(parseFloat(coordinate));
  }

  isSunk() {
    return this.hitSpots.length === this.length;
  }
}

export default Ship;
