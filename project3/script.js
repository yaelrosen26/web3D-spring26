// 3D Model Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-in for First Person Controls
import { PointerLockControls } from "../src/PointerLockControls.js";
import { Font } from "../src/FontLoader.js";
import { TTFLoader } from "../src/TTFLoader.js";
import { TextGeometry } from "../src/TextGeometry.js";
import { GLTFLoader } from "../src/GLTFLoader.js";

//half tone
import { EffectComposer } from "../src/EffectComposer.js";
import { RenderPass } from "../src/RenderPass.js";
import { HalftonePass } from "../src/HalftonePass.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

// Variables for First Person Controls
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = true;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// text variables
let font;
let text = "Model Loading Demo";
let textGeo;
let materials;
let textMesh1;
let textMesh2;
let group;
let mesh;
let mesh11;
let mesh12;
let composer;

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
    renderer.setSize(innerWidth, innerHeight);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 0);

    // Setup First Person Controls
    // DO NOT TOUCH

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById("blocker");
    const instructions = document.getElementById("instructions");

    instructions.addEventListener("click", function () {
        controls.lock();
    });

    controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
    });

    controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
    });

    scene.add(controls.object);

    const onKeyDown = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = true;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = true;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = true;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = true;
                break;

            case "Space":
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = false;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = false;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = false;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = false;
                break;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // End First Person Controls

    // Add world geometry

    // text

    materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];

    //const loader = new TTFLoader();
    //
    //loader.load("../assets/CourierPrime-Bold.ttf", function (json) {
    //    font = new Font(json);
    //    createText();
    //});
    //
    //group = new THREE.Group();
    //group.position.y = 100;
    //
    //scene.add(group);

    // model

    // material for model
    var newMat = new THREE.MeshPhongMaterial({
        color: 0x00c00f,
        specular: 0xbbbbbb,
        shininess: 100
    });

    // laptop
    const loader2 = new GLTFLoader().load(
        "../assets/laptop.glb",
        function (gltf) {
            // Scan loaded model for mesh and apply defined material if mesh is present
            //gltf.scene.traverse(function (child) {
            //    if (child.isMesh) {
            //        child.material = newMat;
            //    }
            //});
            // set position and scale
            mesh = gltf.scene;
            mesh.position.set(-30, 0, -100);
            mesh.scale.set(1.5, 1.5, 1.5);
            mesh.rotateY(0.61799);
            // Add model to scene
            scene.add(mesh);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    // ipad
    const loader3 = new GLTFLoader().load(
        "../assets/ipad.glb",
        function (gltf) {
            // Scan loaded model for mesh and apply defined material if mesh is present
            //gltf.scene.traverse(function (child) {
            //    if (child.isMesh) {
            //        child.material = newMat;
            //    }
            //});
            // set position and scale
            mesh11 = gltf.scene;
            mesh11.position.set(-70, 0, -500);
            mesh11.scale.set(5, 5, 5);
            // Add model to scene
            scene.add(mesh11);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    // camera
    const loader4 = new GLTFLoader().load(
        "../assets/camera.glb",
        function (gltf) {
            // Scan loaded model for mesh and apply defined material if mesh is present
            //gltf.scene.traverse(function (child) {
            //    if (child.isMesh) {
            //        child.material = newMat;
            //    }
            //});
            // set position and scale
            mesh12 = gltf.scene;
            mesh12.position.set(50, 0, -300);
            mesh12.scale.set(50, 50, 50);
            mesh12.rotateY(0.785398);
            // Add model to scene
            scene.add(mesh12);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    //laptop image
    const imgSource = new THREE.TextureLoader().load("../arrowheads/laptopimg.png");
    const imgMaterial = new THREE.MeshBasicMaterial({
        map: imgSource,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry = new THREE.PlaneGeometry(24, 25.25);
    // apply image to shape and add to scene
    const imgPlane = new THREE.Mesh(imgGeometry, imgMaterial);
    imgPlane.position.set(-40, 16, -112);
    imgPlane.rotateY(0.61799);
    //imgPlane.rotateZ(1.5708);
    scene.add(imgPlane);
    
    //camera image
    const imgSource1 = new THREE.TextureLoader().load("../arrowheads/cameraimg.png");
    const imgMaterial1 = new THREE.MeshBasicMaterial({
        map: imgSource1,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry1 = new THREE.PlaneGeometry(27, 18);
    // apply image to shape and add to scene
    const imgPlane1 = new THREE.Mesh(imgGeometry1, imgMaterial1);
    imgPlane1.position.set(50, 0, -290);
    imgPlane1.rotateY(-0.785398);
    //imgPlane.rotateZ(1.5708);
    scene.add(imgPlane1);
    
    //ipad image
    const imgSource2 = new THREE.TextureLoader().load("../arrowheads/ipadimg.png");
    const imgMaterial2 = new THREE.MeshBasicMaterial({
        map: imgSource2,
        side: THREE.DoubleSide
    });
    // create image shape (should be the same aspect ratio as the image)
    const imgGeometry2 = new THREE.PlaneGeometry(80, 60);
    // apply image to shape and add to scene
    const imgPlane2 = new THREE.Mesh(imgGeometry2, imgMaterial2);
    imgPlane2.position.set(-70, 0, -498);
    //imgPlane2.rotateY(-0.785398);
    //imgPlane2.rotateZ(1.5708);
    scene.add(imgPlane2);
    
    
    // Ground
    const earth = new THREE.PlaneGeometry(4000, 4000);
    const ground = new THREE.MeshPhongMaterial({ color: 0xe10dee, flatShading: true });
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
    
    // post-processing

composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const params = {
    shape: 1,
    radius: 1.704,
    rotateR: Math.PI / 12,
    rotateB: (Math.PI / 12) * 2,
    rotateG: (Math.PI / 12) * 3,
    scatter: 0,
    blending: 0.16,
    blendingMode: 1,
    greyscale: false,
    disable: false
};
const halftonePass = new HalftonePass(params);
composer.addPass(renderPass);
composer.addPass(halftonePass);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();
    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // jump fix
        controls.object.position.y += velocity.y * delta;
        if (controls.object.position.y < 10) {
            velocity.y = 0;
            controls.object.position.y = 10;

            canJump = true;
        }
    }

    prevTime = time;
    // End First Person Control Animations

    render();
}

// Function to render the scene using the camera.
function render() {
    composer.render(scene, camera);
}

//
function createText() {
    textGeo = new TextGeometry(text, {
        font: font,
        size: 20,
        depth: 10,
        curveSegments: 4,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: truei
    });

    textGeo.computeBoundingBox();

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.z = -150;
    textMesh1.position.y = -100;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    group.add(textMesh1);
}



window.onresize = function () {
    // resize composer
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};
