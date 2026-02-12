let myShape;
let cameraSwitch = true;
let r = 255;
let g = 255;
let b = 255;
let rl = 255;
let gl = 255;
let bl = 255;

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    
    let button = createButton("Reset Canvas");
    button.mousePressed(reset);
}

function draw() {
    background(0);

    if (cameraSwitch) {
        perspective();
    } else if (!cameraSwitch) {
        ortho();
    }

    orbitControl();
    noStroke();
    lights();
    apple();
}

function apple() {
    angleMode(DEGREES);
    fill(r, b, g);
    specularMaterial(rl, gl, bl);
    shininess(10);
    translate(-30, -10, 0);
    sphere(40);
    translate(0, -50, 0);
    box(10, 40, 10);
    translate(100, 10, 0);
    cylinder(35, 150);
    translate(-180, 45, 0);
    cone(30, 50, 24, 1, false);
}

function keyPressed() {
    if (key == "c") {
        r = random(255);
        g = random(255);
        b = random(255);
    } else if (key == "l") {
        rl = random(255);
        gl = random(255);
        bl = random(255);
    } else if (key == "p") {
        if (cameraSwitch) {
            cameraSwitch = false;
        } else if (!cameraSwitch) {
            cameraSwitch = true;
        } else if (key == "s") {
            saveScreen();
        }
    }
}

function saveScreen() {
    save(canvas, "demo.png");
}

function reset() {
    r = 255;
    g = 255;
    b = 255;
    rl = 255;
    gl = 255;
    bl = 255;
    cameraSwitch = true;
}
