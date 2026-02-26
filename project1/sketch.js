let line1 = display;
let line2 = messages;
let objectSwap = false;

function preload() {
    font = loadFont("./watchfont.ttf");
}

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(9, 54, 128);
    orbitControl();
    lights();
    ambientLight(200);
    spotLight(227, 216, 16, 0, -40, 0, 0, 1, 0, 100, 0.5);

    //display();
    //messages();

    //watch body
    push();
    fill(50);
    noStroke();
    rotateX(90);
    box(100, 80, 20);
    pop();

    push();
    noStroke();
    fill(50);
    rotateY(90);
    translate(33, 0, 43);
    cylinder(10, 20);
    pop();

    push();
    noStroke();
    fill(50);
    rotateY(90);
    translate(-33, 0, 43);
    cylinder(10, 20);
    pop();

    push();
    noStroke();
    fill(50);
    rotateY(90);
    translate(33, 0, -43);
    cylinder(10, 20);
    pop();

    push();
    noStroke();
    fill(50);
    rotateY(90);
    translate(-33, 0, -43);
    cylinder(10, 20);
    pop();

    //band
    push();
    translate(0, 110, 0);
    fill(30);
    rotateX(90);
    translate(100, 0, 110);
    box(120, 60, 5);
    pop();

    push();
    translate(0, 110, 0);
    fill(30);
    rotateX(90);
    translate(-100, 0, 110);
    box(120, 60, 5);
    pop();

    //swaping
    push();
    if (objectSwap) {
        display();
    } else if (!objectSwap) {
        messages();
    }
    pop();
}

function display() {
    textFont(font);
    fill(227, 216, 16, 20);
    textSize(45);
    for (let i = 0; i < 20; i++) {
        push();
        translate(0, 0, i * 0.5);
        text("12:00", -55, -60);
        textSize(30);
        text("TUE 24", -40, -100);
        textSize(25);
        text("36 Degrees", -55, -35);
        pop();
    }
}

function messages() {
    textFont(font);
    fill(227, 216, 16, 20);
    for (let i = 0; i < 1; i++) {
        push();
        translate(0, 0, i * 0.5);
        translate(20, -50, 0);
        noStroke();
        box(60, 30, 10);
        pop();
    }
}

function keyPressed() {
    if (key == "s") {
        if (objectSwap) {
            objectSwap = false;
        } else if (!objectSwap) {
            objectSwap = true;
        }
    }
}
