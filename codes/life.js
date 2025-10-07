/**
 * life.js - Conway's Game of Life Simulation
 */

// --- Configuration ---
const CELL_SIZE = 10; // Size of each cell in pixels
const ALIVE_COLOR = '#00FF00'; // Bright green for live cells
const FPS = 10; // Generations per second (lower is slower)
const TICK_INTERVAL = 1000 / FPS; 

// --- Setup ---
const canvas = document.getElementById('life-canvas');
const ctx = canvas.getContext('2d');

let COLS;
let ROWS;
let grid;
let lastTickTime = 0;

// Resize canvas and recalculate grid dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate grid dimensions based on window size and cell size
    COLS = Math.floor(canvas.width / CELL_SIZE);
    ROWS = Math.floor(canvas.height / CELL_SIZE);

    // Re-initialize or resize the grid if necessary
    if (!grid) {
        initGrid();
        randomizeGrid();
    } else {
        // Simple resizing logic, could be improved for continuity
        const newGrid = createEmptyGrid(ROWS, COLS);
        for (let r = 0; r < Math.min(ROWS, grid.length); r++) {
            for (let c = 0; c < Math.min(COLS, grid[0].length); c++) {
                newGrid[r][c] = grid[r][c];
            }
        }
        grid = newGrid;
    }
}

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
            // 1 = alive, 0 = dead
            grid[r][c] = Math.random() < density ? 1 : 0;
        }
    }
}

// --- Game Logic ---

// Counts the live neighbors of a cell at (r, c)
function countNeighbors(r, c) {
    let count = 0;
    // Iterate over the 3x3 area surrounding the cell
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself
            
            const neighborR = r + i;
            const neighborC = c + j;

            // Check boundaries (ignoring cells outside the grid)
            if (neighborR >= 0 && neighborR < ROWS && neighborC >= 0 && neighborC < COLS) {
                count += grid[neighborR][neighborC];
            }
        }
    }
    return count;
}

// Calculate the next generation of the grid
function getNextGeneration() {
    const nextGrid = createEmptyGrid(ROWS, COLS);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const neighbors = countNeighbors(r, c);
            const isAlive = grid[r][c];

            // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
            if (isAlive === 1 && neighbors < 2) {
                nextGrid[r][c] = 0;
            }
            // 2. Any live cell with two or three live neighbors lives on (survival)
            else if (isAlive === 1 && (neighbors === 2 || neighbors === 3)) {
                nextGrid[r][c] = 1;
            }
            // 3. Any live cell with more than three live neighbors dies (overpopulation)
            else if (isAlive === 1 && neighbors > 3) {
                nextGrid[r][c] = 0;
            }
            // 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
            else if (isAlive === 0 && neighbors === 3) {
                nextGrid[r][c] = 1;
            }
            // Cell remains dead otherwise
            else {
                nextGrid[r][c] = isAlive;
            }
        }
    }
    return nextGrid;
}

// --- Drawing ---

// Draws the current grid state to the canvas
function drawGrid() {
    // Clear the canvas (assuming background color is set via CSS body/canvas)
    // For performance, we only draw the live cells.

    ctx.fillStyle = ALIVE_COLOR;
    
    // Clear the canvas to the background color (black)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === 1) {
                // Draw a rectangle for the live cell
                ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// --- Main Loop ---

function gameLoop(timestamp) {
    // Check if it's time for the next generation tick based on FPS
    if (timestamp - lastTickTime > TICK_INTERVAL) {
        // Calculate and set the new grid
        grid = getNextGeneration();
        
        // Draw the new state
        drawGrid();

        lastTickTime = timestamp;
    }

    // Use requestAnimationFrame for smooth, non-blocking rendering
    requestAnimationFrame(gameLoop);
}

// --- Initialization and Event Listeners ---
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas(); // Set initial size and grid
requestAnimationFrame(gameLoop); // Start the game loop
