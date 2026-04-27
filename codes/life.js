/**
 * life.js - Conway's Game of Life Simulation
 */

// --- Configuration ---
const CELL_SIZE = 4;
const ALIVE_COLOR = '#000000';
const FPS = 10;
const TICK_INTERVAL = 500 / FPS;

// --- Setup ---
const canvas = document.getElementById('life-canvas'); // Fixed: was 'life-canvas'
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fixed: use the canvas's own dimensions instead of window size
let COLS = Math.floor(canvas.width / CELL_SIZE);
let ROWS = Math.floor(canvas.height / CELL_SIZE);
let grid;
let lastTickTime = 0;

// Helper to create a 2D array initialized to 0 (dead)
function createEmptyGrid(rows, cols) {
    return Array(rows).fill(null).map(() => Array(cols).fill(0));
}

// Initialize the grid with empty cells
function initGrid() {
    grid = createEmptyGrid(ROWS, COLS);
}

// Populate the grid with random live cells
function randomizeGrid(density = 0.2) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[r][c] = Math.random() < density ? 1 : 0;
        }
    }
}

// --- Game Logic ---

function countNeighbors(r, c) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborR = r + i;
            const neighborC = c + j;
            if (neighborR >= 0 && neighborR < ROWS && neighborC >= 0 && neighborC < COLS) {
                count += grid[neighborR][neighborC];
            }
        }
    }
    return count;
}

function getNextGeneration() {
    const nextGrid = createEmptyGrid(ROWS, COLS);
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const neighbors = countNeighbors(r, c);
            const isAlive = grid[r][c];
            if (isAlive === 1 && neighbors < 2) {
                nextGrid[r][c] = 0;
            } else if (isAlive === 1 && (neighbors === 2 || neighbors === 3)) {
                nextGrid[r][c] = 1;
            } else if (isAlive === 1 && neighbors > 3) {
                nextGrid[r][c] = 0;
            } else if (isAlive === 0 && neighbors === 3) {
                nextGrid[r][c] = 1;
            } else {
                nextGrid[r][c] = isAlive;
            }
        }
    }
    return nextGrid;
}

// --- Drawing ---

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ALIVE_COLOR;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === 1) {
                ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// --- Main Loop ---

function gameLoop(timestamp) {
    if (timestamp - lastTickTime > TICK_INTERVAL) {
        grid = getNextGeneration();
        drawGrid();
        lastTickTime = timestamp;
    }
    requestAnimationFrame(gameLoop);
}

// --- Initialization ---
initGrid();
randomizeGrid();
requestAnimationFrame(gameLoop);
