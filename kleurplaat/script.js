let canvasLengthSlider = document.getElementById("canvasLength")
let canvasLength = canvasLengthSlider.value;

let outputLength = document.getElementById("canvasCurrentLength");
outputLength.innerHTML = canvasLength;

canvasLengthSlider.oninput = function () {
    outputLength.innerHTML = this.value;
}

let canvasWidthSlider = document.getElementById("canvasWidth")
let canvasWidth = canvasWidthSlider.value;

let outputWidth = document.getElementById("canvasCurrentWidth");
outputWidth.innerHTML = canvasWidth;

canvasWidthSlider.oninput = function () {
    outputWidth.innerHTML = this.value;
}

let canvas = document.getElementById('canvas');
canvas.height = canvasLength;
canvas.width = canvasWidth;

let x = 0;
let y = 0;

let isDrawing = false;

let hasLeftTheCanvasWithMouseDown = false;

let mouseDown = false;

let ctx = canvas.getContext('2d');

let colorPicker = document.getElementById("color");
let color = colorPicker.value;

let penSizeSlider = document.getElementById("penSize")
let penSize = penSizeSlider.value;

let outputPenSize = document.getElementById("currentPenSize");
outputPenSize.innerHTML = penSize;

penSizeSlider.oninput = function () {
    outputPenSize.innerHTML = this.value;
}

let shapeSelect = document.getElementById("shape");
let shape = shapeSelect.value;

let pen = new Tool(color, penSize, shape);

penSizeSlider.addEventListener("change", (e) => {
    pen.size = penSizeSlider.value;
})

colorPicker.addEventListener("input", (e) => {
    pen.color = colorPicker.value;
})

shapeSelect.addEventListener("change", (e) =>{
    console.log(shapeSelect.value);
    pen.shape = shapeSelect.value;
})

canvas.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;

    isDrawing = true;
    mouseDown = true;

    if (isFill) {
        fill(e.offsetX, e.offsetY);
    }
})

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        draw(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
})

canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
    mouseDown = false;
})

canvas.addEventListener("mouseleave", (e) => {
    x = 0;
    y = 0;
    if (mouseDown) {
        isDrawing = true;
    } else {
        isDrawing = false;
    }
})

canvas.addEventListener("mouseenter", (e) => {
    if (isDrawing) {
        x = e.offsetX;
        y = e.offsetY;
        draw(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
})

function draw(currentX, currentY, newX, newY) {
    ctx.beginPath();
    ctx.strokeStyle = pen.color;
    ctx.lineWidth = pen.size;
    ctx.lineCap = pen.shape;
    ctx.lineJoin = 'round';
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    ctx.closePath;
}

