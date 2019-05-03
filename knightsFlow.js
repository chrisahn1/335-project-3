let source = [1, 2];
let sink = [8, 7];
let gridBoundaries = [1, 10];

let stack = [];
let maxPossibleFlow, lastDistances, referenceFlow;

// create 2d grid where each cell contains its capacity (a random even number)
function createGrid() {
  let gridRows = new Array(10);
  gridRows.fill(new Array(10).fill(0));
  gridRows = gridRows.map(row => {
    row = row.map(() => {
      return Math.floor(Math.random()*15)*2; // random even number
    })
    return row;
  });
  return gridRows;
}

function containsPoint (current, stack) {
  for (let i = 0; i < stack.length; i++) {
    if (current === stack[i]) {
      return true;
    }
  }
  return false;
}

function formatPoint(point) {
  return {
    x: point[0],
    y: point[1]
  };
}

function coordInBounds(coord) {
  return (
    coord >= gridBoundaries[0] &&
    coord <= gridBoundaries[1]
  );
}

function inBounds(point) {
  return (
    coordInBounds(point[0]) &&
    coordInBounds(point[1])
  );
}

// return a knight move in any direction from the start variable
// xSign is left or right, ySign is up or down
// horizontal = move 2 horizontal, 1 vertical
//    else, move 2 vertical, 1 horizontal
function getMove(start, xSign, ySign, horizontal) {
  let newMove;
  if(horizontal) {
    newMove = [start[0] + (2*xSign), start[1] + (1*ySign)];
    if(!coordInBounds(newMove[0])) {
      newMove[0] += (-4*xSign);
    }
    if(!coordInBounds(newMove[1])) {
      newMove[1] += (-2*xSign);
    }
  }
  else {
    newMove = [start[0] + (1*xSign), start[1] + (2*ySign)];
    if(!coordInBounds(newMove[0])) {
      newMove[0] += (-2*xSign);
    }
    if(!coordInBounds(newMove[1])) {
      newMove[1] += (-4*xSign);
    }
  }
  return newMove;
}

function findMoveCloserToSink(knightCoords, sinkCoords) {
  let xDist = sinkCoords[0] - knightCoords[0];
  let yDist = sinkCoords[1] - knightCoords[1];
  let xDistAbs = Math.abs(xDist);
  let yDistAbs = Math.abs(yDist);
  let xSign = xDistAbs / xDist || 1;
  let ySign = yDistAbs / yDist || 1;

  if(xDistAbs + yDistAbs > 3) {
    // move towards destination, leaning either horiz or vert
    return getMove(knightCoords, xSign, ySign, xDistAbs > yDistAbs);
  }
  else if(xDistAbs == 3 && yDistAbs == 0
       || xDistAbs == 1 && yDistAbs == 0
       || xDistAbs == 0 && yDistAbs == 2) {
    // move towards destination, leaning horiz
    return getMove(knightCoords, xSign, ySign, 1);
  }
  else if(xDistAbs == 0 && yDistAbs == 3
       || xDistAbs == 0 && yDistAbs == 1
       || xDistAbs == 2 && yDistAbs == 0) {
    // move towards destination, leaning vert
    return getMove(knightCoords, xSign, ySign, 0);
  }
  else if(xDistAbs == 2 && yDistAbs == 1
       || xDistAbs == 1 && yDistAbs == 2) {
    // success
    return Array.from(sinkCoords);
  }
  else if(xDistAbs == 1 && yDistAbs == 1) {
    // special case: move away vertically, towards horizontally
    return getMove(knightCoords, xSign, -1*ySign, 1);
  }
  
}

function findNextPossibleMoves(knightCoords, grid, maxPossibleFlow = 1000) {
  let possibleMoves = [];
  for(let xSign = -1; xSign <= 1; xSign *= -1) {
    for(let ySign = -1; ySign <= 1; ySign *= -1) {
      for(let horizontal = 0; horizontal <= 1; horizontal++) {
        let newMove, edgeCapacity;
        if(horizontal) {
          newMove = [start[0] + (2*xSign), start[1] + (1*ySign)];
        }
        else {
          newMove = [start[0] + (1*xSign), start[1] + (2*ySign)];
        }

        edgeCapacity = (grid[newMove[0], newMove[1]] + grid[knightCoords[0], knightCoords[1]]) / 2;
        if(inBounds(newMove) || edgeCapacity >= referenceFlow) {
          possibleMoves.push({
            coords: newMove,
            edgeCapacity: Math.min(edgeCapacity, maxPossibleFlow)
          });
        }
      }
    }  
  }
  return possibleMoves
    .sort((a, b) => a.edgeCapacity > b.edgeCapacity)
    .map(a => a.coords);
}

// this assumes distances are sorted from least recent to most recent
// e.g. [3, 5, 7] would be moving away (and would return true)
function isMovingAway(lastDistances) {
  return (lastDistances[2] > lastDistances[1] 
      &&  lastDistances[1] > lastDistances[0]);
}

// ALGORITHM PART 2
function findQuickPath(point, destination) {
  var found = false;
  let currentPoint = point;

  stack.push(formatPoint(currentPoint));

  while (found === false) {
    console.log(formatPoint(currentPoint));
    if (found === true) {
      console.log(formatPoint(currentPoint));
      break;
    }
    
    currentPoint = findMoveCloserToSink(currentPoint, destination);
    if (containsPoint(formatPoint(currentPoint), stack) === false) {
      stack.push(formatPoint(currentPoint));
    }
    if(currentPoint[0] === destination[0]
    && currentPoint[1] === destination[1]) {
      console.log(formatPoint(currentPoint));
      found = true;
      break;
    }
  }
};

findQuickPath(source, sink);
for (let i = 0; i < stack.length; i++) {
  // console.log(stack[i]);
}
