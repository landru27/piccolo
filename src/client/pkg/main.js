////////////////////////////////////////////////////////////////
////////  imports

import * as Presentation from './utility/presentation.js';

import { Config } from './config.js';
import { ThreeApp } from './threeApp.js';
import { Statistics } from './statistics.js';

import { Vector3, Color } from 'three';
import { AxesHelper, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';
import { HemisphereLight } from 'three';

import { World } from 'ecsy';

import { SceneModel } from './components/SceneModel.js';
import { Anima } from './components/Anima.js';
import { PlayerTag, PlayerCamera } from './components/Player.js';
import { PlayerInputs } from './components/PlayerInputs.js';

import { PlayerAction } from './systems/PlayerAction.js';
import { PlayerCameraMotion } from './systems/PlayerCameraMotion.js';
import { Motion } from './systems/Motion.js';

import { PolyTheRobot } from './geomeshes/PolyTheRobot.js';


////////////////////////////////////////////////////////////////
////////  initialize three.js

const config = new Config();

const threeApp = new ThreeApp(config, {
    devicePixelRatio: window.devicePixelRatio,
    appContainerDOMElement: config.app.containerDOMElement,
    appOverlayDOMElement: config.app.overlayDOMElement,
    pointerControlDOMElement: document.body,
    keyboardControlDOMElement: document,
    clearColor: 0x000000,
    background: new Color(config.app.backgroundColor),
    fieldOfVision: config.app.fieldOfVision,
    nearClippingPlane: config.app.nearClippingPlane,
    farClippingPlane: config.app.farClippingPlane,
    cameraPosition: new Vector3(6, 3, 6),
    cameraLookAt: new Vector3(0, 0, 0),
});

window.addEventListener('resize', function() {
    threeApp.resizeViewport();
}, false);

const stats = new Statistics();
stats.showStatsPanel();
stats.attachStatsPanel(document.getElementById('world-area'));


////////////////////////////////////////////////////////////////
////////  initialize the world

const world = new World();

//world.registerComponent(ThreeAppRef);
world.registerComponent(SceneModel);
world.registerComponent(Anima);
world.registerComponent(PlayerTag);
world.registerComponent(PlayerInputs);
world.registerComponent(PlayerCamera);
//world.registerComponent(AmbientLight);
//world.registerComponent(HemisphereLight);
//world.registerComponent(DirectionalLight);
//world.registerComponent(SunCycle);
//world.registerComponent(MoonCycle);
//world.registerComponent(StarCycle);

//world.registerSystem(Terrain);
//world.registerSystem(CelestialCycle);
world.registerSystem(Motion);
world.registerSystem(PlayerAction);
world.registerSystem(PlayerCameraMotion);


////////////////////////////////////////////////////////////////
////////  populate the world

// create something to show -- will move to ECS
threeApp.getScene().add(new AxesHelper(8));
threeApp.getScene().add(new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial({color: 0x7f7f7f})));

// until we get the sun cycle going ...
threeApp.getScene().add(new HemisphereLight(0xbbbbbb, 0x444444, 1));

// the player entity
const playerObj = new PolyTheRobot();
threeApp.getScene().add(playerObj.sceneObject);

const player = world.createEntity()
    .addComponent(PlayerTag)
    .addComponent(PlayerInputs, {
        pointerInputs: threeApp.getPointerInputs(),
        keyboardInputs: threeApp.getKeyboardInputs(),
    })
    .addComponent(PlayerCamera, {
        ref: threeApp.getCamera(),
    })
    .addComponent(SceneModel, {
        ref: playerObj,
    })
    .addComponent(Anima, {
        acceleration: new Vector3(0, 0, 1),
        velocity: new Vector3(0, 0, 0),
    });


////////////////////////////////////////////////////////////////
////////  main loop

function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    const time = performance.now();
    const delta = (time - prevTime) * 0.001;
    prevTime = time;

    world.execute(delta);

    let infoz = [
        'camera position :  ' + 'TODO',  // Presentation.vector3To4Places(player.getComponent(SceneObj).position),
        'camera velocity :  ' + 'TODO',  // Presentation.vector3To4Places(player.getComponent(Velocity).vector),
        'gravity is      :  ' + 'TODO',
        'boundaries is   :  ' + 'TODO',
    ];
    stats.newInfo(infoz);

    threeApp.render();

    stats.end();
}


////////////////////////////////////////////////////////////////
////////  make it so

let prevTime = performance.now();
animate();


////////////////////////////////////////////////////////////////
