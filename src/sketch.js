function removeFromArray(array, element) {
  for (let i = array.length; i >= 0; i--) {
    if (array[i] === element) {
      array.splice(i, 1);
    }
  }
}

function heuristics(a, b) {
  // distance using euclidian distance (pitagoras theorem)
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

let cols = 5;
let rows = 5;
let grid = new Array(cols);

// the spots to be reviewed
let openSet = [];
// the spots reviewed
let closedSet = [];

let start;
let end;

let w, h;

class Spot {
  constructor(i, j) {
    // x
    this.i = i;
    // y
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neightbors = [];
  }

  show(color) {
    fill(color);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  addNeightbors(grid) {
    let i = this.i;
    let j = this.j;

    if (i < cols - 1) {
      this.neightbors.push(grid[i + 1][j])
    }

    if (i > 0) {
      this.neightbors.push(grid[i - 1][j])
    }

    if (j < rows - 1) {
      this.neightbors.push(grid[i][j + 1])
    }

    if (j > 0) {
      this.neightbors.push(grid[i][j - 1])
    }
  }
}

function setup() {
  createCanvas(400, 400);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  // making 2d array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeightbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);
  console.log(grid);
}

function draw() {
  if (openSet.length > 0) {
    console.log('xd');
    let winner = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current === end) {
      console.log('Done!');
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neightbors = current.neightbors;

    for (let i = 0; i < neightbors.length; i++) {
      let neightbor = neightbors[i];

      if (!closedSet.includes(neightbor)) {
        let tempG = current.g + 1;

        if (openSet.includes(neightbor)) {
          if (tempG < neightbor.g) {
            neightbor.g = tempG;
          }
        } else {
          neightbor.g = tempG;
          openSet.push(neightbor);
        }

        neightbor.h = heuristics(neightbor, end);
        neightbor.f = neightbor.g + neightbor.h;
      }
    }

  } else {
    // no solution
  }

  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
}
