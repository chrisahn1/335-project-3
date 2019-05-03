let startingPoint = [2, 2];
let destination = [4, 7];
let gridBoundaries = [1, 10];

let stack = [];

const moveDirections = [
  [-2, -1], [2, -1], [-2, 1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]
];

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

function inBounds(point) {
  return (
    point[0] >= gridBoundaries[0] &&
    point[0] <= gridBoundaries[1] &&
    point[1] >= gridBoundaries[0] &&
    point[1] <= gridBoundaries[1]
  );
}

function knightMovement (point) {
  var found = false;
  let currentPoint = point;
  let newPoint, direction;

  currentPoint[0] -= 2;
  currentPoint[1] -= 1;
  stack.push(formatPoint(currentPoint));

  while (found === false) {
    console.log(formatPoint(currentPoint));
    if (found === true) {
      console.log(formatPoint(currentPoint));
      break;
    }
    
    for(let i = 0; i < moveDirections.length; i++) {
      direction = moveDirections[i];
      newPoint = [currentPoint[0] + direction[0], currentPoint[1] + direction[1]];
      if(inBounds(newPoint)) {
        currentPoint = newPoint;
        break;
      }
    }
    if (containsPoint(formatPoint(currentPoint), stack) === false) {
      stack.push(formatPoint(currentPoint));
    }
    if(currentPoint === destination) {
      console.log(formatPoint(currentPoint));
      found = true;
      break;
    }
  }
};

knightMovement(startingPoint)
for (let i = 0; i < stack.length; i++) {
  console.log(stack[i]);
}
