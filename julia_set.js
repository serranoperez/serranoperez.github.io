const canvas = document.getElementById('fractalCanvas');
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');
const iterations = 100;
const escapeRadius = 4;
const cx = -0.7;
const cy = 0.27015;

let currentIteration = 0;
let animationInterval;

function isInJuliaSet(x, y) {
    let zx = x;
    let zy = y;
    for (let i = 0; i < currentIteration; i++) {
        const xtemp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = xtemp;
        if (zx * zx + zy * zy > escapeRadius * escapeRadius) {
            return false;
        }
    }
    return true;
}

function drawJuliaSet() {
    const imageData = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const px = (x - width / 2) / (width / 4);
            const py = (y - height / 2) / (height / 4);
            const inSet = isInJuliaSet(px, py);
            const color = inSet ? 0 : 255;
            imageData.data[index] = color;
            imageData.data[index + 1] = color;
            imageData.data[index + 2] = color;
            imageData.data[index + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function animateJuliaSet() {
    if (currentIteration <= iterations) {
        drawJuliaSet();
        currentIteration++;
    } else {
        clearInterval(animationInterval);
    }
}

animationInterval = setInterval(animateJuliaSet, 50);
