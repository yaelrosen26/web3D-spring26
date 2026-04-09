//90 degrees = 1.5708

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
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 600);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
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

    //const top = new THREE.Mesh(flatObject, bubbleMat);
    //top.position.set(90, 50, -1);
    //top.rotateY(1.5708);
    //scene.add(top);

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
    imgPlane.position.set(80, 25, 30);
    imgPlane.rotateX(-1.5708);
    imgPlane.rotateZ(1.5708);
    scene.add(imgPlane);
    
    //2

    // Ground
    const earth = new THREE.PlaneGeometry(2000, 2000);
    const ground = new THREE.MeshPhongMaterial({ color: 0x968d88, flatShading: true });
    const meshFloor = new THREE.InstancedMesh(earth, ground, 500);
    meshFloor.translateY(-60);
    meshFloor.rotateX(-1.5708);
    scene.add(meshFloor);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
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
