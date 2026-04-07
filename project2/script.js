//90 degrees = 1.5708

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

    // Add world geometry

    // cabinet1
    const leg = new THREE.BoxGeometry(10, 100, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh = new THREE.InstancedMesh(leg, material, 500);
    mesh.position.set(50, 0, 50);
    scene.add(mesh);

    const leg1 = new THREE.BoxGeometry(10, 100, 10);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh1 = new THREE.InstancedMesh(leg1, material1, 500);
    mesh1.position.set(50, 0, -50);
    scene.add(mesh1);

    const leg2 = new THREE.BoxGeometry(10, 100, 10);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(leg2, material2, 500);
    mesh2.position.set(125, 0, 50);
    scene.add(mesh2);

    const leg3 = new THREE.BoxGeometry(10, 100, 10);
    const material3 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh3 = new THREE.InstancedMesh(leg3, material3, 500);
    mesh3.position.set(125, 0, -50);
    scene.add(mesh3);

    const back = new THREE.BoxGeometry(3, 30, 100);
    const material4 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh4 = new THREE.InstancedMesh(back, material4, 500);
    mesh4.position.set(50, 35, 0);
    scene.add(mesh4);

    const front = new THREE.BoxGeometry(3, 30, 100);
    const material5 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh5 = new THREE.InstancedMesh(front, material5, 500);
    mesh5.position.set(125, 35, 0);
    scene.add(mesh5);

    const right = new THREE.BoxGeometry(3, 30, 80);
    const material6 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh6 = new THREE.InstancedMesh(right, material6, 500);
    mesh6.position.set(88, 35, -50);
    mesh6.rotateY(1.5708);
    scene.add(mesh6);

    const left = new THREE.BoxGeometry(3, 30, 80);
    const material7 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh7 = new THREE.InstancedMesh(left, material7, 500);
    mesh7.position.set(88, 35, 50);
    mesh7.rotateY(1.5708);
    scene.add(mesh7);

    const bottom = new THREE.BoxGeometry(100, 3, 80);
    const material8 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh8 = new THREE.InstancedMesh(bottom, material8, 500);
    mesh8.position.set(90, 19, -1);
    mesh8.rotateY(1.5708);
    scene.add(mesh8);

    const top = new THREE.BoxGeometry(100, 3, 80);
    const material9 = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 1,
        transparent: true,
        opacity: 1,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1
    });
    const mesh9 = new THREE.InstancedMesh(top, material9, 500);
    mesh9.position.set(90, 50, -1);
    mesh9.rotateY(1.5708);
    scene.add(mesh9);

    const bubbleMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        roughness: 0,
        metalness: 0,
        transmission: 1,
        ior: 1.25,
        thickness: 2,
        envMap: refractCube
    });

    const knob = new THREE.SphereGeometry(5, 20, 30);
    const material10 = new THREE.MeshPhongMaterial({ color: 0x635326, flatShading: true });
    const mesh10 = new THREE.InstancedMesh(knob, material10, 500);
    mesh10.position.set(130, 35, -1);
    mesh10.rotateY(1.5708);
    scene.add(mesh10);

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
