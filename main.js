let startingPoint = [2, 2]
let destination = [4, 7]
let rule = [1, 10]

let stack = []

function containsPoint (current, stack) {
  for (let i = 0; i < stack.length; i++) {
    if (current === stack[i]) {
      return true
    }
  }
  return false
}

function knightMovement (point) {
  var found = false
  let prevPoint = point

  var currentPoint = {}
  prevPoint[0] = prevPoint[0] - 2
  prevPoint[1] = prevPoint[1] - 1
  currentPoint['x'] = prevPoint[0]
  currentPoint['y'] = prevPoint[1]
  stack.push(currentPoint)

  while (found === false) {
    if (found === true) {
      console.log(currentPoint)
      break
    }
    currentPoint = {}
    if ((prevPoint[0] - 2) >= rule[0] && (prevPoint[0] - 2) <= rule[1] && (prevPoint[1] - 1) >= rule[0] && (prevPoint[1] - 1) <= rule[1]) {
      // -2 -1
      prevPoint[0] = prevPoint[0] - 2
      prevPoint[1] = prevPoint[1] - 1
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] + 2) >= rule[0] && (prevPoint[0] + 2) <= rule[1] && (prevPoint[1] - 1) >= rule[0] && (prevPoint[1] - 1) <= rule[1]) {
      // +2 -1
      prevPoint[0] = prevPoint[0] + 2
      prevPoint[1] = prevPoint[1] - 1
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] - 2) >= rule[0] && (prevPoint[0] - 2) <= rule[1] && (prevPoint[1] + 1) >= rule[0] && (prevPoint[1] + 1) <= rule[1]) {
      // -2 +1
      prevPoint[0] = prevPoint[0] - 2
      prevPoint[1] = prevPoint[1] + 1
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] + 2) >= rule[0] && (prevPoint[0] + 2) <= rule[1] && (prevPoint[1] + 1) >= rule[0] && (prevPoint[1] + 1) <= rule[1]) {
      // +2 +1
      prevPoint[0] = prevPoint[0] + 2
      prevPoint[1] = prevPoint[1] + 1
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] - 1) >= rule[0] && (prevPoint[0] - 1) <= rule[1] && (prevPoint[1] - 2) >= rule[0] && (prevPoint[1] - 2) <= rule[1]) {
      // -1 -2
      prevPoint[0] = prevPoint[0] - 1
      prevPoint[1] = prevPoint[1] - 2
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] + 1) >= rule[0] && (prevPoint[0] + 1) <= rule[1] && (prevPoint[1] - 2) >= rule[0] && (prevPoint[1] - 2) <= rule[1]) {
      // +1 -2
      prevPoint[0] = prevPoint[0] + 1
      prevPoint[1] = prevPoint[1] - 2
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] - 1) >= rule[0] && (prevPoint[0] - 1) <= rule[1] && (prevPoint[1] + 2) >= rule[0] && (prevPoint[1] + 2) <= rule[1]) {
      // -1 +2
      prevPoint[0] = prevPoint[0] - 1
      prevPoint[1] = prevPoint[1] + 2
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    } else if ((prevPoint[0] + 1) >= rule[0] && (prevPoint[0] + 1) <= rule[1] && (prevPoint[1] + 2) >= rule[0] && (prevPoint[1] + 2) <= rule[1]) {
      // +1 +2
      prevPoint[0] = prevPoint[0] + 1
      prevPoint[1] = prevPoint[1] + 2
      currentPoint['x'] = prevPoint[0]
      currentPoint['y'] = prevPoint[1]
      if (currentPoint === destination) {
        console.log(currentPoint)
        found = true
        break
      }
      if (containsPoint(currentPoint, stack) === false) {
        stack.push(currentPoint)
      }
    }
    if (currentPoint === destination) {
      found = true
    }
  }
};

knightMovement(startingPoint)
// for (let i = 0; i < stack.length; i++) {
//   console.log(stack[i])
// }
