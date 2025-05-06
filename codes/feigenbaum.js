window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var r_min = 2.5;
    var r_max = 4.0;
    var r_step = 0.01;
    var x = 0.5;
    var iterations = 800;
    var current_r = r_min;
    var animationSpeed = 10;
    var requestId;

    function drawPoint(x, y) {
        ctx.fillRect(x, y, 1, 1);
    }

    function iterate(r) {
        for (var i = 0; i < iterations; i++) {
            x = r * x * (1 - x);
            if (i > iterations / 2) {
                drawPoint((r - r_min) / (r_max - r_min) * width, height - x * height);
            }
        }
    }

    function drawDiagram() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        for (var r = r_min; r <= current_r; r += r_step) {
            iterate(r);
        }
        current_r += r_step * animationSpeed;
        if (current_r <= r_max) {
            requestId = requestAnimationFrame(drawDiagram);
        }
    }

    function startAnimation() {
        requestId = requestAnimationFrame(drawDiagram);
    }

    function stopAnimation() {
        cancelAnimationFrame(requestId);
    }

    startAnimation();
};