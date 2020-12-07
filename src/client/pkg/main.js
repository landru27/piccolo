////////////////////////////////////////////////////////////////
////////  imports

import * as Presentation from './utility/presentation.js';

import { ThreeApp } from './threeApp.js';
import { Statistics } from './statistics.js';

import { Object3D, Group } from 'three';
import { Mesh, MeshPhongMaterial, Color, Vector3, Euler } from 'three';
import { BoxBufferGeometry, ConeBufferGeometry } from 'three';

import { World } from 'ecsy';
import { HeightMap } from './components/HeightMap.js';
import { Terrain } from './systems/Terrain.js';

import Blockly from 'blockly';
import Interpreter from 'js-interpreter';


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

//const geometry = new BoxBufferGeometry(2, 2, 2);
//const material = new MeshPhongMaterial({color: 'green'});
//const cube = new Mesh(geometry, material);
//threeApp.getScene().add(cube);

////
const aSmallLandscape = new HeightMap();
threeApp.getScene().add(aSmallLandscape.mesh);

////
let geometry = null;
let material = null;
let mesh = null;

const boomra = new Group();

geometry = new BoxBufferGeometry(0.25, 0.125, 0.5);
material = new MeshPhongMaterial({color: 0xb0c4de});
mesh = new Mesh(geometry, material);
boomra.add(mesh);

geometry = new ConeBufferGeometry(0.01, 0.25, 8);
material = new MeshPhongMaterial({color: 0xb0c4de});
mesh = new Mesh(geometry, material);
mesh.position.set(0.1, 0.1, -0.2);
boomra.add(mesh);

boomra.position.set(60, 0.125, 40);
boomra.rotateY(Math.PI / 2);
threeApp.getScene().add(boomra);


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

    //if (true) {
    if (controls.isLocked === true) {
        // execute the next step in the player-defined program
        if (flagExecuteBlocklyCode) {
            let codeStep = codeEngine.step();
            if (codeStep) {
                console.log('codeStep: ' + codeStep);
            }
        }

        // dampen velocity so we don't meteor away
        velocity.x -= velocity.x * 4 * delta;
        velocity.y -= velocity.y * 4 * delta;
        velocity.z -= velocity.z * 4 * delta;

        botVelocity -= botVelocity * 4 * delta;

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

        // manual bot movement forward
        prevToggleBotMoveFwd = toggleBotMoveFwd;
        toggleBotMoveFwd = commands.toggleBotMoveFwd;
        if (toggleBotMoveFwd && (toggleBotMoveFwd != prevToggleBotMoveFwd)) {
            toggleBotMoveFwd = !toggleBotMoveFwd;
            botAddForwardVelocity();
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

        botMoveForward(botVelocity * delta);

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
document.getElementById( 'world-area' ).appendChild( stats.domElement );
let toggleStats = false;
let prevToggleStats = false;

let toggleGravity = false;
let prevToggleGravity = false;
let flagGravity = true;

let toggleXYZPositive = false;
let prevToggleXYZPositive = false;
let flagXYZPositive = true;

let toggleBotMoveFwd = false;
let prevToggleBotMoveFwd = false;
let flagBotMoveFwd = false;

const velocity = new Vector3();
const direction = new Vector3();
const slew = new Vector3();
let moveJumping;
let prevJumping;

let botVelocity = 0.0;
const botDirection = new Vector3();

let prevTime = performance.now();
let movement;
let commands;


////////////////////////////////////////////////////////////////
////////  blockly

let codeEngine = null;
let flagExecuteBlocklyCode = false;

Blockly.defineBlocksWithJsonArray([
  {
    "type": "move_bot_fwd",
    "message0": "Move forward",
    "previousStatement": null,
    "colour": 355
  }
]);
Blockly.JavaScript['move_bot_fwd'] = function(block) {
  return 'botAddForwardVelocity();\n';
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "turn_bot_left",
    "message0": "Turn left",
    "previousStatement": null,
    "colour": 355
  }
]);
Blockly.JavaScript['turn_bot_left'] = function(block) {
  return 'botTurnLeft();\n';
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "turn_bot_right",
    "message0": "Turn right",
    "previousStatement": null,
    "colour": 355
  }
]);
Blockly.JavaScript['turn_bot_right'] = function(block) {
  return 'botTurnRight();\n';
};

const workspace = Blockly.inject('blockly-area', {
    toolbox: document.getElementById('toolbox')
});

document.getElementById('buttonRunProgram').addEventListener('click', handleRunProgram);

function handleRunProgram(event) {
    console.log('handleRunProgram');

    document.getElementById('buttonRunProgram').removeEventListener('click', handleRunProgram);
    document.getElementById('buttonStopProgram').addEventListener('click', handleStopProgram);

    let blocklyCode = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());

    const initFunc = function(interpreter, globalObject) {

      var wrapper = function() {
        return botAddForwardVelocity();
      };
      interpreter.setProperty(globalObject, 'botAddForwardVelocity', interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return botTurnLeft();
      };
      interpreter.setProperty(globalObject, 'botTurnLeft', interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return botTurnRight();
      };
      interpreter.setProperty(globalObject, 'botTurnRight', interpreter.createNativeFunction(wrapper));

    };

    if (blocklyCode) {
        codeEngine = new Interpreter(blocklyCode, initFunc);
        flagExecuteBlocklyCode = true;
    }

    try {
      console.log(blocklyCode);
    } catch (error) {
      console.log(error);
    }
}

function handleStopProgram(event) {
    console.log('handleStopProgram');

    flagExecuteBlocklyCode = false;
    codeEngine = null;

    document.getElementById('buttonStopProgram').removeEventListener('click', handleStopProgram);
    document.getElementById('buttonRunProgram').addEventListener('click', handleRunProgram);
}

function botMoveForward(distance) {
    boomra.getWorldDirection(botDirection);
    boomra.position.addScaledVector(botDirection, distance);
}

function botAddForwardVelocity(distance) {
    botVelocity += 1.0;
}

function botTurnLeft(distance) {
    boomra.rotateY(Math.PI / 6);
}

function botTurnRight(distance) {
    boomra.rotateY(-Math.PI / 6);
}


////////////////////////////////////////////////////////////////
////////  make it so

animate();


////////////////////////////////////////////////////////////////
