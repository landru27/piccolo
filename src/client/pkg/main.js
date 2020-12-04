////////////////////////////////////////////////////////////////
////////  imports

import { ThreeApp } from './threeApp.js';

import { Mesh, MeshPhongMaterial, Color, Vector3 } from 'three';
import { BoxBufferGeometry } from 'three';
// import { World } from 'ecsy';


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

// let world = new World();

// world.registerComponent(HeightMap);
// world.registerComponent(LODMesh);
// world.registerComponent(BiomeMap);
// world.registerComponent(Location);
// world.registerComponent(Motion);
// world.registerComponent(Position);

// world.registerSystem(Terrain);
// world.registerSystem(Movement);


////////////////////////////////////////////////////////////////
////////  initialize three.js

const threeApp = new ThreeApp({
    devicePixelRatio: devicePixelRatio,
    viewWidth: viewWidth,
    viewHeight: viewHeight,
    clearColor: 0x000000,
    background: new Color('skyblue'),
    fieldOfVision: 35,
    aspectRatio: viewWidth / viewHeight,
    nearClippingPlane: 0.1,
    farClippingPlane: 100,
    cameraPosition: new Vector3(1, 1, 10),
    cameraLookAt: new Vector3(0, 0, 0),
    keyboardControlDOMElement: document,
    pointerControlDOMElement: document.body,
});

threeApp.setAmbientLighting({
    color: 0x7f7f7f,
});

threeApp.addDirectionalLighting({
    color: 0xffffff,
    intensity: 1,
    position: new Vector3(1, 2, 3),
});

////////////////////////////////////////////////////////////////
////////  connect three.js to the browser page

container.append(threeApp.getRenderDOMElement());

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    viewWidth = container.clientWidth;
    viewHeight = container.clientHeight;

    threeApp.resizeViewport();
}

infoDetails.addEventListener( 'click', function () {
    threeApp.getPointerControls().lock();
}, false );
threeApp.getPointerControls().addEventListener( 'lock', function () {
    infoDetails.style.display = 'none';
    infoOverlay.style.display = 'none';
} );
threeApp.getPointerControls().addEventListener( 'unlock', function () {
    infoOverlay.style.display = 'block';
    infoDetails.style.display = '';
} );


////////////////////////////////////////////////////////////////
////////  populate the world

// create something to show -- will move to ECS
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshPhongMaterial({color: 'green'});
const cube = new Mesh(geometry, material);
threeApp.getScene().add(cube);


////////////////////////////////////////////////////////////////
////////  main loop

function animate() {
    requestAnimationFrame( animate );

    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    prevTime = time;

    let controls = threeApp.getPointerControls();

    if (controls.isLocked === true) {
        // friction
        velocity.z -= velocity.z * Math.PI * delta;
        velocity.x -= velocity.x * Math.PI * delta;
        // gravity
        velocity.y -= 9.8 * 10.0 * delta;

        // movement input
        let movement = threeApp.getKeyboardControls().getMovement();

        direction.z = Number(movement.moveForward) - Number(movement.moveBackward);
        direction.x = Number(movement.moveRight) - Number(movement.moveLeft);
        direction.normalize();

        // movement
        if (movement.moveForward || movement.moveBackward) {
            velocity.z -= direction.z * 40.0 * delta;
        }
        controls.moveForward(- velocity.z * delta);

        if (movement.moveLeft || movement.moveRight) {
            velocity.x -= direction.x * 40.0 * delta;
        }
        controls.moveRight(- velocity.x * delta);

        // jumping
        if (controls.getObject().position.y < 0.01) {
            controls.getObject().position.y = 0;
            velocity.y = 0;
        }
        if (movement.moveJump) {
            velocity.y += 4;
        }
        controls.getObject().position.y += (velocity.y * delta);
    }

    threeApp.render();
}

let prevTime = performance.now();

const velocity = new Vector3();
const direction = new Vector3();

animate();

////////////////////////////////////////////////////////////////
