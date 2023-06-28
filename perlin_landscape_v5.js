let myp5;  // define myp5 in the global scope

window.onload = function() {
    let sketch = function(p) {
        let yoff;  // Declare yoff here without initializing

        p.setup = function() {
            let canvas = p.createCanvas(710, 400, p.SVG);
            canvas.parent('canvasContainer');
            p.background(255);
            p.noLoop();
        };

        p.draw = function() {
            const lines = parseInt(document.getElementById('lines').value, 10);
            const segments = parseInt(document.getElementById('segments').value, 10);
            const amplification = parseFloat(document.getElementById('amplification').value);

            p.background(255); // Reset the background before each draw
            yoff = 0.0; // Reset yoff to 0 each time draw is called

            p.stroke(0);
            p.noFill();

            for (let y = 0; y < lines; y++) {
                p.beginShape();
                let xoff = 0;
                for (let x = 0; x < segments; x++) {
                    let xMapped = p.map(x, 0, segments, 0, p.width);
                    let yMapped = p.map(p.noise(xoff, yoff), 0, 1, -p.height / (2 * lines), p.height / (2 * lines)) * amplification;
                    p.vertex(xMapped, y * (p.height / lines) + yMapped); // Adjust y position to be within canvas and add Perlin noise offset
                    xoff += 0.05;
                }
                yoff += 0.01; // Increment yoff inside the y-loop
                p.endShape();
            }
        };

        p.keyPressed = function() {
            if (p.keyCode === 83) {
                p.save("perlin_landscape.svg");
            }
        };
    };

    myp5 = new p5(sketch);  // initialize myp5 inside window.onload
};
