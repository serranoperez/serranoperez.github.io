// Función para calcular el conjunto de Mandelbrot iteradamente con un retraso entre iteraciones
function iterateMandelbrotWithDelay(maxIterations, delay) {
    const canvas = document.getElementById('mandelbrotCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width
    const height = canvas.height
    
    // Iniciar con 1 iteración
    let iterations = 1;

    function draw() {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const cx = (x - width / 2) * 4 / width;
                const cy = (y - height / 2) * 4 / height;
                let zx = 0;
                let zy = 0;
                let i = 0;

                for (; i < iterations; i++) {
                    const tmp = zx * zx - zy * zy + cx;
                    zy = 2 * zx * zy + cy;
                    zx = tmp;

                    if (zx * zx + zy * zy >= 4) {
                        break;
                    }
                }

                const color = (i === iterations) ? 0 : 255;
                data[index] = color; // Red
                data[index + 1] = color; // Green
                data[index + 2] = color; // Blue
                data[index + 3] = 255; // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // Incrementar el número de iteraciones y redibujar después de un retraso
        iterations++;

        if (iterations <= maxIterations) {
            setTimeout(draw, delay);
        }
    }

    draw();
}

iterateMandelbrotWithDelay(100, 50)