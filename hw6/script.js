// Basic Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-in for orbit controls
import { OrbitControls } from "./src/OrbitControls.js";
//import { FontLoader } from "./src/FontLoader.js";

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
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(400, 400);
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
    const trunkGeometry = new THREE.CylinderGeometry(20, 20, 200);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x4f3c09, flatShading: true });
    const mesh3 = new THREE.InstancedMesh(trunkGeometry, material1, 500);
    mesh3.position.set(-100, -100, 0);
    scene.add(mesh3);

    const coneGeometry = new THREE.ConeGeometry(90, 120, 300);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x0a5e2e, flatShading: true });
    const mesh4 = new THREE.InstancedMesh(coneGeometry, material2, 500);
    mesh4.position.set(-100, 10, 0);
    scene.add(mesh4);

    const torusGeometry = new THREE.TorusGeometry(20, 20, 300);
    const material3 = new THREE.MeshPhongMaterial({ color: 0x60b3eb, flatShading: true });
    const mesh5 = new THREE.InstancedMesh(torusGeometry, material3, 500);
    mesh5.position.set(-100, 150, -100);
    mesh5.rotateY(90);
    scene.add(mesh5);

    const torus1Geometry = new THREE.TorusGeometry(20, 20, 300);
    const material4 = new THREE.MeshPhongMaterial({ color: 0x60b3eb, flatShading: true });
    const mesh6 = new THREE.InstancedMesh(torus1Geometry, material4, 500);
    mesh6.position.set(-100, 150, -140);
    mesh6.rotateY(90);
    scene.add(mesh6);
    
    const torus2Geometry = new THREE.TorusGeometry(20, 20, 300);
    const material5 = new THREE.MeshPhongMaterial({ color: 0x60b3eb, flatShading: true });
    const mesh7 = new THREE.InstancedMesh(torus2Geometry, material5, 500);
    mesh7.position.set(-100, 100, -125);
    mesh7.rotateY(90);
    scene.add(mesh7);

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
