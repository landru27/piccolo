////////////////////////////////////////////////////////////////
////////  imports

import * as Presentation from './utility/presentation.js';

import { ThreeApp } from './threeApp.js';
import { Statistics } from './statistics.js';

import { Mesh, MeshPhongMaterial, Color, Vector3 } from 'three';
import { BoxBufferGeometry } from 'three';

import { World } from 'ecsy';
import { HeightMap } from './components/HeightMap.js';
import { Terrain } from './systems/Terrain.js';


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

const world = new World();

world.registerComponent(HeightMap);
//world.registerComponent(Location);
//world.registerComponent(Position);
//world.registerComponent(Motion);
//world.registerComponent(PlayerCamera);

world.registerSystem(Terrain);
//world.registerSystem(PlayerCommand);
//world.registerSystem(PlayerMovement);
//world.registerSystem(PlayerCamera);
//world.registerSystem(Movement);


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
    farClippingPlane: 1000,
    cameraPosition: new Vector3(54, 1, 37),
    cameraLookAt: new Vector3(58, 1, 38),
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

const aSmallLandscape = new HeightMap();
threeApp.getScene().add(aSmallLandscape.mesh);


////////////////////////////////////////////////////////////////
////////  main loop

function animate() {
    requestAnimationFrame( animate );

    stats.begin();

    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    prevTime = time;

    // command input
    commands = threeApp.getKeyboardControls().getCommands();

    if (controls.isLocked === true) {
        // dampen velocity so we don't meteor away
        velocity.x -= velocity.x * 4 * delta;
        velocity.y -= velocity.y * 4 * delta;
        velocity.z -= velocity.z * 4 * delta;

        // gravity
        prevToggleGravity = toggleGravity;
        toggleGravity = commands.toggleGravity;
        if (toggleGravity && (toggleGravity != prevToggleGravity)) {
            flagGravity = !flagGravity;
        }
        if (flagGravity) {
            camera.position.y -= 9.8 * 3.0 * delta;
        }

        // boundaries
        prevToggleXYZPositive = toggleXYZPositive;
        toggleXYZPositive = commands.toggleXYZPositive;
        if (toggleXYZPositive && (toggleXYZPositive != prevToggleXYZPositive)) {
            flagXYZPositive = !flagXYZPositive;
        }
        if (flagXYZPositive) {
            if (camera.position.x < 0.00001) {
                camera.position.x = 0.00002;
                velocity.x = 0;
            }
            if (camera.position.y < 1.00001) {
                camera.position.y = 1.00002;
                velocity.y = 0;
            }
            if (camera.position.z < 0.00001) {
                camera.position.z = 0.00002;
                velocity.z = 0;
            }
        }

        // movement input
        movement = threeApp.getKeyboardControls().getMovement();

        direction.z = Number(movement.moveForward) - Number(movement.moveBackward);
        direction.y = Number(movement.moveUpward) - Number(movement.moveDownward);
        direction.x = Number(movement.moveRightward) - Number(movement.moveLeftward);
        direction.normalize();

        slew.z = Number(movement.slewForward) - Number(movement.slewBackward);
        slew.y = Number(movement.slewUpward) - Number(movement.slewDownward);
        slew.x = Number(movement.slewRightward) - Number(movement.slewLeftward);
        slew.normalize();

        // movement
        velocity.z += direction.z * 40.0 * delta;
        controls.moveForward(velocity.z * delta);

        velocity.y += direction.y * 40.0 * delta;
        controls.moveUpward(velocity.y * delta);

        velocity.x += direction.x * 40.0 * delta;
        controls.moveRightward(velocity.x * delta);

        // jumping
        prevJumping = moveJumping;
        moveJumping = movement.moveJump;
        if (moveJumping && (moveJumping != prevJumping)) {
            velocity.y += 4000.0 * delta;
            controls.moveUpward(velocity.y * delta);
        }

        // slewing
        camera.position.x += slew.x * delta;
        camera.position.y += slew.y * delta;
        camera.position.z -= slew.z * delta;
    }

    let infoz = [
        'camera position :  ' + Presentation.vector3To4Places(camera.position),
        'camera velocity :  ' + Presentation.vector3To4Places(velocity),
        'gravity is      :  ' + (flagGravity ? 'on' : 'off'),
        'boundaries is   :  ' + (flagXYZPositive ? 'on' : 'off'),
    ];
    stats.newInfo(infoz);

    prevToggleStats = toggleStats;
    toggleStats = commands.toggleStats;
    if (toggleStats && (toggleStats != prevToggleStats)) {
        stats.domElement.style.display = (stats.domElement.style.display === 'block' ? 'none' : 'block');
    }

    threeApp.render();

    stats.end();
}

const controls = threeApp.getPointerControls();
const camera = controls.getCamera();

const stats = new Statistics();
stats.domElement.style.display = 'block';
document.body.appendChild( stats.domElement );
let toggleStats = false;
let prevToggleStats = false;

let toggleGravity = false;
let prevToggleGravity = false;
let flagGravity = true;

let toggleXYZPositive = false;
let prevToggleXYZPositive = false;
let flagXYZPositive = true;

const velocity = new Vector3();
const direction = new Vector3();
const slew = new Vector3();
let moveJumping;
let prevJumping;

let prevTime = performance.now();
let movement;
let commands;

animate();

////////////////////////////////////////////////////////////////
