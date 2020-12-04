////////////////////////////////////////////////////////////////
////////  imports

import { ThreeApp } from './threeApp.js';

import { PerspectiveCamera } from 'three';
import { AmbientLight, HemisphereLight, DirectionalLight } from 'three';
import { Mesh, MeshBasicMaterial, MeshPhongMaterial, Color } from 'three';
import { PointerLockControls } from './jsm/controls/PointerLockControls.js';
import { Vector2, Vector3 } from 'three';
import { BoxBufferGeometry } from 'three';
import { World } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  detect our runtime environment

const devicePixelRatio = window.devicePixelRatio;

const container = document.querySelector('#canvas-container');
let viewWidth = container.clientWidth;
let viewHeight = container.clientHeight;

const infoOverlay = document.getElementById( 'info-overlay' );
const infoDetails = document.getElementById( 'info' );


////////////////////////////////////////////////////////////////
////////  initialize the world

let world = new World();

// world.registerComponent(HeightMap);
// world.registerComponent(LODMesh);
// world.registerComponent(BiomeMap);
// world.registerComponent(Location);
// world.registerComponent(Motion);
// world.registerComponent(Position);

// world.registerSystem(Terrain);
// world.registerSystem(Movement);


////////////////////////////////////////////////////////////////
////////  initialize threejs

const threeApp = new ThreeApp({
    devicePixelRatio: devicePixelRatio,
    viewWidth: viewWidth,
    viewHeight: viewHeight,
    ClearColor: 0x000000,
    Background: new Color('skyblue'),
});

threeApp.setAmbientLighting({
    color: 0x7f7f7f,
});

threeApp.addDirectionalLighting({
   color: 0xffffff,
   intensity: 1,
   position: new Vector3(1, 2, 3),
});

container.append(threeApp.getDOMElement());

let scene = threeApp.getScene();
let renderer = threeApp.getRenderer();

////////////////////////////////////////////////////////////////
////////  player

// player camera
const fov = 35;
const aspect = viewWidth / viewHeight;
const near = 0.1;
const far = 100;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(1, 1, 10);
camera.lookAt(0, 0, 0);

// accommodate browser resizing
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    viewWidth = container.clientWidth;
    viewHeight = container.clientHeight;

    camera.aspect = viewWidth / viewHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( viewWidth, viewHeight );
}

// player controls -- will move to ECS
let controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveJump = false;

const velocity = new Vector3();
const direction = new Vector3();

controls = new PointerLockControls( camera, document.body );
infoDetails.addEventListener( 'click', function () {
    controls.lock();
}, false );
controls.addEventListener( 'lock', function () {
    infoDetails.style.display = 'none';
    infoOverlay.style.display = 'none';
} );
controls.addEventListener( 'unlock', function () {
    infoOverlay.style.display = 'block';
    infoDetails.style.display = '';
} );
scene.add(controls.getObject());

const onKeyDown = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;

        case 32: // space
            moveJump = true;
            break;
    }
};

const onKeyUp = function (event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;

        case 32: // space
            moveJump = false;
            break;
    }
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );


////////////////////////////////////////////////////////////////
////////  populate the world

// create something to show -- will move to ECS
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshPhongMaterial({color: 'green'});
const cube = new Mesh(geometry, material);
scene.add(cube);


////////////////////////////////////////////////////////////////
////////  main loop

function animate() {
    requestAnimationFrame( animate );

    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    prevTime = time;

    if (controls.isLocked === true) {
        // friction
        velocity.z -= velocity.z * Math.PI * delta;
        velocity.x -= velocity.x * Math.PI * delta;
        // gravity
        velocity.y -= 9.8 * 10.0 * delta;

        // movement input
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        // movement
        if (moveForward || moveBackward) {
            velocity.z -= direction.z * 40.0 * delta;
        }
        controls.moveForward(- velocity.z * delta);

        if (moveLeft || moveRight) {
            velocity.x -= direction.x * 40.0 * delta;
        }
        controls.moveRight(- velocity.x * delta);

        // jumping
        if (controls.getObject().position.y < 0.01) {
            controls.getObject().position.y = 0;
            velocity.y = 0;
        }
        if (moveJump) {
            velocity.y += 4;
        }
        controls.getObject().position.y += (velocity.y * delta);
    }

    renderer.render( scene, camera );
}

let prevTime = performance.now();
animate();

////////////////////////////////////////////////////////////////
