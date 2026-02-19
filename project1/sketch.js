function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    background(200);
    orbitControl();

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

    //screen
    push();
    translate(0, 0, 8);
    //plane(70, 90);
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
}
