# Project 3 Plan

Last revised April 27, 2019





### Part 0 - Setup


- We will create a 2D grid array that contains all cells. The elements in the array will be the capacities of each cell, which are randomly generated.
  - I've written the code for this [here](https://pastebin.com/yC4Cp72X)
- Draw the grid using the code from Project 1 and modifying it.
- Each grid cell needs to show its capacity, so the cells will be represented as grid boxes. This means knight movement will take place from the middle of each grid cell, not from the line intersections.

### Part 1 - Finding "Maximum Possible Flow"

The source and the sink are the only two cells that we *know* will be part of the path before we even start. By looking at all possible edges, and their capacities, from the source and sink, we can take the maximum of these capacity values and denote this as the **maximum possible flow**. Here are the steps:

- Find all edges of the source using `findNextPossibleMoves([1, 2])` Of the edges, find the largest edge capacity and store this number.
  - (JavaScript allows you to omit parameters when calling a function. Since **maxPossibleFlow** doesn't exist yet, it is not given).
- Find all edges of the sink using `findNextPossibleMoves([8, 7])`. Of the edges, find the largest edge capacity and store this number.
- Find the maximum of these two numbers and store this in the **maxPossibleFlow** variable.



### Part 2 - Finding the First Path

Before running the main algorithm to find the path with the max flow, we will start by finding a basic path that quickly gets from the source to the sink. This consists of running `findMoveCloserToSink()` in a loop until it reaches the sink. Then it stores the flow of this path in the **referenceFlow** variable, which will be utilized in Part 3.



### Part 3 - Finding a Path with Max Flow

Now that we have a working path, and we know the flow of this path, we can make attempts to find paths with larger flows, and hopefully get to the **maxPossibleFlow**. The following DFS traversal sequence will run for each knight step, using either recursion or a loop:

- Find the Manhattan Distance between this point and the sink, push this to the beginning of **lastDistances** array.
  - If it is 0, then the path is complete and we can break the loop/recursion. 
- If  **lastDistances** contains four numbers, pop the back of the **lastDistances** array so it contains three.
- Call `isMovingAway(lastDistances)` to make sure the knight is not moving away from the sink. If it is, undo this move.
- Call `findNextPossibleMoves()` with the current knight coordinates and the **maxPossibleFlow** as parameters. This will return the next possible moves, in order of greatest edge capacity. 
- Walk through all of these moves where the edge capacity >= **referenceFlow**, using DFS traversal. 
  - If an edge capacity is less than **referenceFlow**, that means it is not a good path to take.



Using this method, we are consistently checking each move as we form the path to make sure we are selecting nodes with the greatest edge capacities, while also using the `isMovingAway()` function to make sure we approach the point.



### Variable Reference

- **maxPossibleFlow**: the highest flow attainable, according to the edge capacities of the source and sink. See Part 1 for more info.
- **lastDistances**: While the knight is moving, this variable contains the three most recent distances from its position to the sink position. This is used in `isMovingAway()` to determine if the knight is approaching the sink.
- **referenceFlow**: This will contain the flow of the first path, which is used as a starting point to weed out any paths with a flow less than this number (remember, the goal is to find the max flow).

### Function Reference

These are functions that will be used throughout the program. They have not been coded yet.

- `findMoveCloserToSink(knightCoords, sinkCoords)`: (This will be used to move the knight in **Part 2**, the first path) Given the coordinates of the knight and the sink, return the best move for getting the knight closer to the sink. In this function, we don't care about edge capacities. 
  - For example, if the knight is at [3, 3] and the sink is at [7, 5], it's further away horizontally, so its next move should be [5, 4]. I've also included clever conditions for when the knight gets closer, e.g. [6, 4] -> [8, 3] -> [7, 5].
  - I have this function mostly written out already, and will push it to the repository soon. 
- `findNextPossibleMoves(knightCoords, maxPossibleFlow)`: (This will be used to move the knight in **Part 3**, and does consider edge capacities) Given an array of coordinates `[x, y]`, it will return all possible knight moves from that location, sorting them by their edge capacities. If **maxPossibleFlow** is given, those with edge capacities >= **maxPossibleFlow** will all be considered the same, with regards to sorting.
  - This is because the max possible flow sets an upper bound that cannot be broken by any edge capacity. For example, if the max possible flow is 10, it is useless to compare two edges with capacities of 12 and 14.
- `isMovingAway(lastDistances)`: Every time the knight moves, an int is pushed to the **lastDistances** array containing the distance between its location and the sink. **lastDistances** will always contain three ints. This function, given the **lastDistances**, will detect whether or not the knight is moving further away from the sink by comparing all three numbers. If they are ascending, the function **returns** `true`, and the knight will move back. 
  - It's possible that **lastDistances** should contain two numbers instead of three. We'll have to test that out to see what works.

