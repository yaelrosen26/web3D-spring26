function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    orbitControl();
    //top left sphere
    push();
    stroke(255);
    fill(66, 135, 245);
    translate(-150, -150, 0);
    sphere(30);
    pop();
    //bottom right sphere
    push();
    stroke(255);
    fill(66, 135, 245);
    translate(150, 150, 0);
    sphere(30);
    pop();
    //top right sphere
    push();
    stroke(255);
    fill(66, 135, 245);
    translate(150, -150, 0);
    sphere(30);
    pop();
    //bottom left sphere
    push();
    stroke(255);
    fill(66, 135, 245);
    translate(-150, 150, 0);
    sphere(30);
    pop();
    //right cylinder
    push();
    stroke(255);
    fill(191, 66, 245);
    translate(150, 0, 0);
    cylinder(15, 70);
    pop();
    //left cylinder
    push();
    stroke(255);
    fill(191, 66, 245);
    translate(-150, 0, 0);
    cylinder(15, 70);
    pop();
    //bottom cylinder
    push();
    stroke(255);
    fill(191, 66, 245);
    translate(0, 150, 0);
    rotateZ(90);
    cylinder(15, 70);
    pop();
    //top cylinder
    push();
    stroke(255);
    fill(191, 66, 245);
    translate(0, -150, 0);
    rotateZ(90);
    cylinder(15, 70);
    pop();
    //ring
    push();
    stroke(255);
    fill(245, 206, 66);
    torus(30);
    pop();
}
