let myShape;

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);

}

function draw (){
    background(0);
    orbitControl();
    noStroke();
    lights();
    rose();
    rose();
    rose();
    rose();
}

function rose(){
    angleMode(DEGREES);
    fill(9, 135, 79);
    shininess(10);
    specularMaterial(9, 135, 79);
    cylinder(5, 150);

    fill(224, 33, 16);
    specularMaterial(224, 33, 16);
    translate(0, -100, 0);
    sphere(30, 6);

    fill(171, 114, 39);
    specularMaterial(171, 114, 39);
    translate(0, 170, 0);
    box(70, 20);
    translate(0, 30, 0);
    box(50, 60, 20);

    fill(9, 135, 79);
    specularMaterial(9, 135, 79);
    translate(-15, -80, 0);
    rotateZ(90);
    cone(5, 25);
    translate(-30, -30, 0);
    rotateZ(180);
    cone(5, 25);
    translate(30, -30, 0);
    rotateZ(180);
    cone(5, 25);
}
