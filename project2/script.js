//90 degrees = 1.5708
//-180 in x cab2

// The main library script
import * as THREE from "three";

// The plug-in for orbit controls
import { OrbitControls } from "../src/OrbitControls.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

const flatObject = new THREE.BoxGeometry(100, 3, 80);
const frontPanel = new THREE.BoxGeometry(3, 30, 100);
const rightPanel = new THREE.BoxGeometry(3, 30, 80);
const leftPanel = new THREE.BoxGeometry(3, 30, 80);
const backPanel = new THREE.BoxGeometry(3, 30, 100);
const bottomPanel = new THREE.BoxGeometry(100, 3, 80);
const firstLeg = new THREE.BoxGeometry(10, 100, 10);
const secondLeg = new THREE.BoxGeometry(10, 100, 10);
const thirdLeg = new THREE.BoxGeometry(10, 100, 10);
const fourthLeg = new THREE.BoxGeometry(10, 100, 10);
const earth1 = new THREE.PlaneGeometry(2000, 2000);

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfeff5);
    scene.fog = new THREE.FogExp2(0x9aa5a6, 0.0015);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 600);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    camera.position.set(400, 200, 0);

    // Setup controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.cursorStyle = "grab";
    controls.maxPolarAngle = Math.PI / 2;

    //glass material
    const bubbleMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        roughness: 0,
        metalness: 0,
        transmission: 1,
        ior: 1.25,
        thickness: 2
    });

    // wood material
    // load image as a texture
    const imgSource1 = new THREE.TextureLoader().load("../arrowheads/wood-texture.jpg");
    // use loaded testure in a material
    const imgMaterial1 = new THREE.MeshBasicMaterial({
        map: imgSource1,
        side: THREE.DoubleSide
    });

    // floor material
    // load image as a texture
    const imgSource2 = new THREE.TextureLoader().load("../arrowheads/floor");
    // use loaded testure in a material
    const imgMaterial2 = new THREE.MeshBasicMaterial({
        map: imgSource2,
        side: THREE.DoubleSide
    });

    // Add world geometry

    // cabinet1
    const leg = new THREE.Mesh(firstLeg, imgMaterial1);
    leg.position.set(50, 0, 50);
    scene.add(leg);

    const leg1 = new THREE.Mesh(secondLeg, imgMaterial1);
    leg1.position.set(50, 0, -50);
    scene.add(leg1);

    const leg2 = new THREE.Mesh(thirdLeg, imgMaterial1);
    leg2.position.set(125, 0, 50);
    scene.add(leg2);

    const leg3 = new THREE.Mesh(fourthLeg, imgMaterial1);
    leg3.position.set(125, 0, -50);
    scene.add(leg3);

    const back = new THREE.Mesh(backPanel, imgMaterial1);
    back.position.set(50, 35, 0);
    scene.add(back);

    const front = new THREE.Mesh(frontPanel, imgMaterial1);
    front.position.set(125, 35, 0);
    scene.add(front);

    const right = new THREE.Mesh(rightPanel, imgMaterial1);
    right.position.set(88, 35, -50);
    right.rotateY(1.5708);
    scene.add(right);

    const left = new THREE.Mesh(leftPanel, imgMaterial1);
    left.position.set(88, 35, 50);
    left.rotateY(1.5708);
    scene.add(left);

    const bottom = new THREE.Mesh(bottomPanel, imgMaterial1);
    bottom.position.set(90, 19, -1);
    bottom.rotateY(1.5708);
    scene.add(bottom);

    const top = new THREE.Mesh(flatObject, bubbleMat);
    top.position.set(90, 50, -1);
    top.rotateY(1.5708);
    scene.add(top);

    const knob = new THREE.SphereGeometry(5, 20, 30);
    const material10 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh10 = new THREE.InstancedMesh(knob, material10, 500);
    mesh10.position.set(130, 35, -1);
    mesh10.rotateY(1.5708);
    scene.add(mesh10);

    //sign
    const signSource = new THREE.TextureLoader().load("../arrowheads/sign.png");
    const signMaterial = new THREE.MeshBasicMaterial({
        map: signSource,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const signGeometry = new THREE.PlaneGeometry(20, 11.4286);
    // apply image to shape and add to scene
    const signPlane = new THREE.Mesh(signGeometry, signMaterial);
    signPlane.position.set(130, 37, -25);
    signPlane.rotateY(1.5708);
    scene.add(signPlane);

    //cabinent 2
    const legCab = new THREE.Mesh(firstLeg, imgMaterial1);
    legCab.position.set(-130, 0, 50);
    scene.add(legCab);

    const leg1Cab = new THREE.Mesh(secondLeg, imgMaterial1);
    leg1Cab.position.set(-130, 0, -50);
    scene.add(leg1Cab);

    const leg2Cab = new THREE.Mesh(thirdLeg, imgMaterial1);
    leg2Cab.position.set(-55, 0, 50);
    scene.add(leg2Cab);

    const leg3Cab = new THREE.Mesh(fourthLeg, imgMaterial1);
    leg3Cab.position.set(-55, 0, -50);
    scene.add(leg3Cab);

    const backCab = new THREE.Mesh(backPanel, imgMaterial1);
    backCab.position.set(-130, 35, 0);
    scene.add(backCab);

    const frontCab = new THREE.Mesh(frontPanel, imgMaterial1);
    frontCab.position.set(-55, 35, 0);
    scene.add(frontCab);

    const rightCab = new THREE.Mesh(rightPanel, imgMaterial1);
    rightCab.position.set(-92, 35, -50);
    rightCab.rotateY(1.5708);
    scene.add(rightCab);

    const leftCab = new THREE.Mesh(leftPanel, imgMaterial1);
    leftCab.position.set(-92, 35, 50);
    leftCab.rotateY(1.5708);
    scene.add(leftCab);

    const bottomCab = new THREE.Mesh(bottomPanel, imgMaterial1);
    bottomCab.position.set(-90, 19, -1);
    bottomCab.rotateY(1.5708);
    scene.add(bottomCab);

    const topCab = new THREE.Mesh(flatObject, bubbleMat);
    topCab.position.set(-90, 50, -1);
    topCab.rotateY(1.5708);
    scene.add(topCab);

    const knobCab = new THREE.SphereGeometry(5, 20, 30);
    const material11 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh11 = new THREE.InstancedMesh(knobCab, material11, 500);
    mesh11.position.set(-50, 35, -1);
    mesh11.rotateY(1.5708);
    scene.add(mesh11);

    //sign2
    const sign1Source = new THREE.TextureLoader().load("../arrowheads/sign.png");
    const sign1Material = new THREE.MeshBasicMaterial({
        map: sign1Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const sign1Geometry = new THREE.PlaneGeometry(20, 11.4286);
    // apply image to shape and add to scene
    const sign1Plane = new THREE.Mesh(sign1Geometry, sign1Material);
    sign1Plane.position.set(-50, 37, -25);
    sign1Plane.rotateY(1.5708);
    scene.add(sign1Plane);

    //arrowheads
    //1
    const imgSource = new THREE.TextureLoader().load("../arrowheads/artboard1.png");
    const imgMaterial = new THREE.MeshBasicMaterial({
        map: imgSource,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    imgPlane.position.set(70, 25, 30);
    imgPlane.rotateX(-1.5708);
    imgPlane.rotateZ(1.5708);
    scene.add(imgPlane);

    //2
    const img1Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-2.png");
    const img1Material = new THREE.MeshBasicMaterial({
        map: img1Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img1Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img1Plane = new THREE.Mesh(img1Geometry, img1Material);
    img1Plane.position.set(100, 25, 30);
    img1Plane.rotateX(-1.5708);
    img1Plane.rotateZ(1.5708);
    scene.add(img1Plane);

    //3
    const img2Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-3.png");
    const img2Material = new THREE.MeshBasicMaterial({
        map: img2Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img2Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img2Plane = new THREE.Mesh(img2Geometry, img2Material);
    img2Plane.position.set(90, 25, -2);
    img2Plane.rotateX(-1.5708);
    img2Plane.rotateZ(1.5708);
    scene.add(img2Plane);

    //4
    const img3Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-4.png");
    const img3Material = new THREE.MeshBasicMaterial({
        map: img3Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img3Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img3Plane = new THREE.Mesh(img3Geometry, img3Material);
    img3Plane.position.set(70, 25, -30);
    img3Plane.rotateX(-1.5708);
    img3Plane.rotateZ(1.5708);
    scene.add(img3Plane);

    //5
    const img4Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-5.png");
    const img4Material = new THREE.MeshBasicMaterial({
        map: img4Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img4Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img4Plane = new THREE.Mesh(img4Geometry, img4Material);
    img4Plane.position.set(100, 25, -30);
    img4Plane.rotateX(-1.5708);
    img4Plane.rotateZ(1.5708);
    scene.add(img4Plane);

    //6
    const img5Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-6.png");
    const img5Material = new THREE.MeshBasicMaterial({
        map: img5Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img5Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img5Plane = new THREE.Mesh(img5Geometry, img5Material);
    img5Plane.position.set(-110, 25, 30);
    img5Plane.rotateX(-1.5708);
    img5Plane.rotateZ(1.5708);
    scene.add(img5Plane);

    //7
    const img6Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-7.png");
    const img6Material = new THREE.MeshBasicMaterial({
        map: img6Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img6Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img6Plane = new THREE.Mesh(img6Geometry, img6Material);
    img6Plane.position.set(-80, 25, 30);
    img6Plane.rotateX(-1.5708);
    img6Plane.rotateZ(1.5708);
    scene.add(img6Plane);

    //8
    const img7Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-8.png");
    const img7Material = new THREE.MeshBasicMaterial({
        map: img7Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img7Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img7Plane = new THREE.Mesh(img7Geometry, img7Material);
    img7Plane.position.set(-90, 25, -2);
    img7Plane.rotateX(-1.5708);
    img7Plane.rotateZ(1.5708);
    scene.add(img7Plane);

    //9
    const img8Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-9.png");
    const img8Material = new THREE.MeshBasicMaterial({
        map: img8Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img8Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img8Plane = new THREE.Mesh(img8Geometry, img8Material);
    img8Plane.position.set(-110, 25, -30);
    img8Plane.rotateX(-1.5708);
    img8Plane.rotateZ(1.5708);
    scene.add(img8Plane);

    //10
    const img9Source = new THREE.TextureLoader().load("../arrowheads/arrowheadsArtboard-10.png");
    const img9Material = new THREE.MeshBasicMaterial({
        map: img9Source,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const img9Geometry = new THREE.PlaneGeometry(20, 26.6);
    // apply image to shape and add to scene
    const img9Plane = new THREE.Mesh(img9Geometry, img9Material);
    img9Plane.position.set(-80, 25, -30);
    img9Plane.rotateX(-1.5708);
    img9Plane.rotateZ(1.5708);
    scene.add(img9Plane);

    // Ground
    const floor = new THREE.Mesh(earth1, imgMaterial2);
    floor.translateY(-60);
    floor.rotateX(-1.5708);
    scene.add(floor);

    //back wall
    const wall = new THREE.PlaneGeometry(2000, 5000);
    const material = new THREE.MeshBasicMaterial({ color: 0xf3f3cb, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(wall, material);
    plane.position.set(-500, -500, -25);
    plane.rotateY(-1.5708);
    scene.add(plane);
    
    //right wall
    const wall2 = new THREE.PlaneGeometry(2000, 4000);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xf3f3cb, side: THREE.DoubleSide });
    const plane2 = new THREE.Mesh(wall2, material2);
    plane2.position.set(-1000, 37, -325);
    plane2.rotateZ(1.5708);
    scene.add(plane2);
    
    //left wall
    const wall3 = new THREE.PlaneGeometry(2000, 4000);
    const material3 = new THREE.MeshBasicMaterial({ color: 0xf3f3cb, side: THREE.DoubleSide });
    const plane3 = new THREE.Mesh(wall3, material3);
    plane3.position.set(-1000, 37, 325);
    plane3.rotateZ(1.5708);
    scene.add(plane3);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    //const dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
    //dirLight2.position.set(-1, -1, -1);
    //scene.add(dirLight2);

    //const ambientLight = new THREE.AmbientLight(0x555555);
    //scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    controls.update();
    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.render(scene, camera);
}
