document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Function to generate a random color
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    // Function to draw a point
    function drawPoint(x, y) {
        context.beginPath();
        context.arc(x, y, 2, 0, Math.PI * 2); // Small circle as a point
        context.fillStyle = getRandomColor(); // Random color
        context.fill();
        context.closePath();
    }

    // Function to clear the canvas
    function clearCanvas() {
        context.clearRect(0, 0, width, height);
    }

    // Recursive function to draw the Sierpinski triangle
    function drawSierpinski(x, y, size, depth) {
        if (depth === 0) {
            drawPoint(x, y);
            drawPoint(x + size / 2, y - (size * Math.sqrt(3)) / 2);
            drawPoint(x + size, y);
        } else {
            const newSize = size / 2;

            drawSierpinski(x, y, newSize, depth - 1);
            drawSierpinski(x + newSize / 2, y - (newSize * Math.sqrt(3)) / 2, newSize, depth - 1);
            drawSierpinski(x + newSize, y, newSize, depth - 1);
        }
    }

    // Function to animate the drawing of the Sierpinski triangle
    function drawSierpinskiAnimated(depth) {
        let currentDepth = 0;
        const interval = setInterval(function() {
            clearCanvas();
            drawSierpinski(0, height, width, currentDepth);
            currentDepth++;
            if (currentDepth > depth) {
                currentDepth = 0; // Restart the animation
            }
        }, 300); // Interval in milliseconds
    }

    // Start the animation with a depth of 6
    drawSierpinskiAnimated(6);
});