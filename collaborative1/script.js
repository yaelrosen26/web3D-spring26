import * as THREE from "three";
import { OrbitControls } from "./src/OrbitControls.js";
let camera, canvas, controls, scene, renderer;

init();

function init() {
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5590ed);
    scene.fog = new THREE.FogExp2(0xbfeff5, 0.0015);
    renderer = new THREE.WebGLRenderer({ antialias: true });
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

    // Mountain1
    const coneGeometry = new THREE.ConeGeometry(30, 150);
    const material1 = new THREE.MeshPhongMaterial({ color: 0xf7f5f0, flatShading: true });
    const mesh3 = new THREE.InstancedMesh(coneGeometry, material1, 500);
    mesh3.position.set(-100, 10, 50);
    scene.add(mesh3);

    // Mountain2
    const cone2Geometry = new THREE.ConeGeometry(30, 200);
    const material2 = new THREE.MeshPhongMaterial({ color: 0xf7f5f0, flatShading: true });
    const mesh4 = new THREE.InstancedMesh(cone2Geometry, material2, 500);
    mesh4.position.set(-100, 10, 130);
    scene.add(mesh4);

    // Mountain3
    const cone3Geometry = new THREE.ConeGeometry(30, 100);
    const material3 = new THREE.MeshPhongMaterial({ color: 0xf7f5f0, flatShading: true });
    const mesh5 = new THREE.InstancedMesh(cone3Geometry, material3, 500);
    mesh5.position.set(-100, -10, -50);
    scene.add(mesh5);

    // Mountain4
    const cone4Geometry = new THREE.ConeGeometry(30, 50);
    const material4 = new THREE.MeshPhongMaterial({ color: 0xf7f5f0, flatShading: true });
    const mesh6 = new THREE.InstancedMesh(cone4Geometry, material4, 500);
    mesh6.position.set(-100, -30, -150);
    scene.add(mesh6);

    // Ground
    const earth = new THREE.PlaneGeometry(2000, 2000);
    const ground = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    mesh2.translateY(-60);
    mesh2.rotateX(-1.5708);
    scene.add(mesh2);

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


function animate() {
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}
