
var canvas= document.querySelector('canvas');
//make canvas fill the entire window (though our grid does not necessarily have to)
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

//get drawing methods for the canvas
var c= canvas.getContext('2d');

//set cell size for our grid
var square_size= 60;

//these two function draw the grid, could be done in one with two for-loops but I thought it was clearer this way 
function draw_grid_corners(coord){
for (var i=0; i<square_size*10; i+=square_size){
	c.rect(coord,i, square_size, square_size);
	c.rect(i, coord, square_size, square_size)
	c.stroke();
}
}

function draw_grid(){
for (var i=0; i<square_size*10; i+=square_size){
	draw_grid_corners(i);
}

}

draw_grid();


//can be used to mark the position of the knight in each step once we have our path
function draw_circle(x, y){
	c.beginPath();
	c.arc(x, y, 5, 0, Math.PI* 2, false);
	c.stroke();

}

//marks source point at 1,2 (indexed from zero)
c.strokeStyle= 'blue';
draw_circle((square_size/2)+square_size, (square_size/2)+ square_size*2);

//marks sink at 8,7 
c.strokeStyle= 'red';
draw_circle((square_size/2)+(square_size*8), (square_size/2)+ square_size*7);


//create 2d array of the flow capacity
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


var flow_values= createGrid();

//draws randomized source values on the canvas, saved in the 2d array above
function draw_flow_capacity(){
	for (var i=0; i<10; i++){//(var i= square_size/2; i<square_size*10; i+=square_size){
		x_coordinate= i * square_size+20;
		for (var j=0; j<10; j++){
		 	c.font= "10px Arial";
		 	c.fillText(flow_values[i][j], x_coordinate, j*square_size+12);
		 	console.log("This is x" + x_coordinate);
		 	
		 }

	}
}


draw_flow_capacity();

//this is going to help draw our path, connecting the circles
function draw_line(x_start, y_start, x_end, y_end){
	c.beginPath();
	c.moveTo(x_start, y_start);
	c.lineTo(x_end, y_end);
	c.strokeStyle= "#fa34a3";
	c.stroke();
}




//creates an animation loop, may use this to show position of knight moving
// function animate(){
// 	requestAnimationFrame(animate);
// 	// c.beginPath();
// 	// c.arc(x, 200, 15, 0, Math.PI* 2, false);
// 	// c.strokeStyle= 'blue';
// 	// c.stroke();
// 	c.moveTo(50, 300);
// 	c.lineTo(x, y);
// 	c.strokeStyle= "#fa34a3";
// 	c.stroke();

// 	x+=1;
// }
// animate();




