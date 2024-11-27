const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let cellSize = 10; // Size of each cell in pixels
let rows, cols, grid, gameInterval;

resizeCanvas();
window.addEventListener("resize", resizeGameBoard);

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
document.addEventListener("keydown", handleKeyPress);

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

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rows = Math.floor(canvas.height / cellSize);
    cols = Math.floor(canvas.width / cellSize);
}

function resizeGameBoard() {
    const oldGrid = grid; // Save the current grid
    resizeCanvas();
    const newGrid = createEmptyGrid();

    // Copy old grid data into the new grid
    for (let i = 0; i < Math.min(rows, oldGrid.length); i++) {
        for (let j = 0; j < Math.min(cols, oldGrid[i].length); j++) {
            newGrid[i][j] = oldGrid[i][j];
        }
    }

    grid = newGrid; // Update grid
    drawGrid(); // Redraw after resizing
}

function initializeGame() {
    resizeCanvas();
    grid = createEmptyGrid();
    drawGrid();
}

function handleMouseDown(event) {
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
        if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
            grid[cellY][cellX] = grid[cellY][cellX] ? 0 : 1;
            drawGrid();
        }
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = grid[i][j] ? "#0000FF" : "#FFFFFF";
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
    } else {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}

function updateGrid() {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newGrid[i][j] = neighbors === 3 ? 1 : 0;
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

// Initialize the game
initializeGame();
