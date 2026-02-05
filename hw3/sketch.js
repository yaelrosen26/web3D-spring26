let myShape;

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
    //ballBlob();
}

function draw() {
    background(0);
    orbitControl();
    noStroke();
    lights();
    
    fill(9, 135, 79);
    shininess(10);
    //specularMaterial(255,0,255);
    //emissiveMaterial(255,0,255);
    cylinder(5, 150);
    //filter(POSTERIZE, 1);
    //model(myShape);
    
    fill(224, 33, 16);
    translate(0, -100, 0);
    sphere(30, 6);
       
    fill(171, 114, 39);
    translate(0,170,0);
    box(70, 20);
    translate(0,30,0);
    box(50, 60, 20);
    
    translate(0,-70,0);
    cone(30, 50);

}
