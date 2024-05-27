const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;
let grid = createEmptyGrid();
let gameInterval;

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
document.addEventListener("keydown", handleKeyPress);
document.getElementById("startButton").addEventListener("click", toggleGame);

let isMouseDown = false;

function createEmptyGrid() {
    let emptyGrid = [];
    for (let i = 0; i < rows; i++) {
        emptyGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            emptyGrid[i][j] = 0;
        }
    }
    return emptyGrid;
}

function handleMouseDown() {
    isMouseDown = true;
    handleClick(event);
}

function handleMouseUp() {
    isMouseDown = false;
}

function handleMouseMove(event) {
    if (isMouseDown) {
        handleClick(event);
    }
}

function handleClick(event) {
    if (!gameInterval) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        grid[cellY][cellX] = grid[cellY][cellX] ? 0 : 1;
        drawGrid();
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = "#0000FF"; // Color azul
            } else {
                ctx.fillStyle = "#fff";
            }
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        toggleGame();
    }
}

function toggleGame() {
    if (!gameInterval) {
        gameInterval = setInterval(updateGrid, 100);
        document.getElementById("startButton").textContent = "Stop";
    } else {
        clearInterval(gameInterval);
        gameInterval = null;
        document.getElementById("startButton").textContent = "Start";
    }
}

function updateGrid() {
    let newGrid = createEmptyGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newGrid[i][j] = 0;
                } else {
                    newGrid[i][j] = 1;
                }
            } else {
                if (neighbors === 3) {
                    newGrid[i][j] = 1;
                }
            }
        }
    }
    grid = newGrid;
    drawGrid();
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const neighborRow = (row + i + rows) % rows;
            const neighborCol = (col + j + cols) % cols;
            count += grid[neighborRow][neighborCol];
        }
    }
    count -= grid[row][col];
    return count;
}