// Basic Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-in for orbit controls
import { OrbitControls } from "../src/OrbitControls.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfeff5);
    scene.fog = new THREE.FogExp2(0xbfeff5, 0.0015);
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

    // Add world geometry

    // cabinet
    const leg = new THREE.BoxGeometry(10, 100, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    const mesh = new THREE.InstancedMesh(leg, material, 500);
    mesh.position.set(-100, 0, 50);
    scene.add(mesh);

    const leg1 = new THREE.BoxGeometry(10, 100, 10);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    const mesh1 = new THREE.InstancedMesh(leg1, material1, 500);
    mesh1.position.set(-100, 0, -50);
    scene.add(mesh1);
    
    const leg2 = new THREE.BoxGeometry(10, 100, 10);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(leg2, material2, 500);
    mesh2.position.set(-175, 0, 50);
    scene.add(mesh2);
    
    const leg3 = new THREE.BoxGeometry(10, 100, 10);
    const material3 = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    const mesh3 = new THREE.InstancedMesh(leg3, material3, 500);
    mesh3.position.set(-175, 0, -50);
    scene.add(mesh3);
    
    const back = new THREE.BoxGeometry(3, 30, 50);
    const material4 = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    const mesh4 = new THREE.InstancedMesh(back, material4, 500);
    mesh4.position.set(100, 0, -50);
    scene.add(mesh4);

    // Ground
    const earth = new THREE.PlaneGeometry(2000, 2000);
    const ground = new THREE.MeshPhongMaterial({ color: 0x402314, flatShading: true });
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
