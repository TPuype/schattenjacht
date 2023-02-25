let field = document.getElementById("field");
let amountOfRows;
let amountOfCollumns;

let canvasLengthSlider = document.getElementById("canvasLength")
let canvasLength = canvasLengthSlider.value;

let canvasWidthSlider = document.getElementById("canvasWidth")
let canvasWidth = canvasWidthSlider.value;


let outputCanvasLength = document.getElementById("canvasCurrentLength");
outputCanvasLength.innerHTML = canvasLength;

let outputCanvasWidth = document.getElementById("canvasCurrentWidth");
outputCanvasWidth.innerHTML = canvasWidth;

canvasLengthSlider.oninput = function () {
    outputCanvasLength.innerHTML = this.value;
}

canvasWidthSlider.oninput = function () {
    outputCanvasWidth.innerHTML = this.value;
}

let canvas = new Canvas(field, canvasLength, canvasWidth);
canvas.createCanvas();


field.addEventListener('mouseover', function (e) {
  const cell = e.target.closest('td');
  if (!cell) {return;}
  const row = cell.parentElement;
  console.log(row.rowIndex, cell.cellIndex);
  changeColour(cell);
});

function changeColour(cell){
    cell.style.backgroundColor = "red";
}

