////////////////////////////////////////////////////////////////
////////  imports

import * as Presentation from './utility/presentation.js';

import { ThreeApp } from './threeApp.js';
import { Statistics } from './statistics.js';

import { Object3D, Vector3, Color } from 'three';
import { AxesHelper, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

import { World } from 'ecsy';

import { SceneObj } from './components/SceneObj.js';
import { PlayerTag, PlayerKeyboardControls, PlayerPointerControls, PlayerCamera } from './components/Player.js';
import { PlayerCameraMotion } from './systems/PlayerCameraMotion.js';


////////////////////////////////////////////////////////////////
////////  initialize three.js

const threeApp = new ThreeApp({
    devicePixelRatio: window.devicePixelRatio,
    appContainerDOMElement: 'appContainer',
    appOverlayDOMElement: 'appOverlay',
    keyboardControlsDOMElement: document,
    pointerControlsDOMElement: document.body,
    clearColor: 0x000000,
    background: new Color('skyblue'),
    fieldOfVision: 35,
    nearClippingPlane: 0.1,
    farClippingPlane: 1000,
    cameraPosition: new Vector3(32, 32, 32),
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
world.registerComponent(SceneObj);
world.registerComponent(PlayerTag);
world.registerComponent(PlayerKeyboardControls);
world.registerComponent(PlayerPointerControls);
world.registerComponent(PlayerCamera);
//world.registerComponent(Propulsion);
//world.registerComponent(Velocity);
//world.registerComponent(AmbientLight);
//world.registerComponent(HemisphereLight);
//world.registerComponent(DirectionalLight);
//world.registerComponent(SunCycle);
//world.registerComponent(MoonCycle);
//world.registerComponent(StarCycle);

//world.registerSystem(PlayerAction);
world.registerSystem(PlayerCameraMotion);
//world.registerSystem(CelestialCycle);
//world.registerSystem(Motion);
//world.registerSystem(Terrain);


////////////////////////////////////////////////////////////////
////////  populate the world

// create something to show -- will move to ECS
threeApp.getScene().add(new AxesHelper(8));
threeApp.getScene().add(new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial({color: 0x7f7f7f})));

// the player entity
const playerObj = new Object3D();
const player = world.createEntity();
player.addComponent(SceneObj, {ref: playerObj});
player.addComponent(PlayerTag);
player.addComponent(PlayerKeyboardControls, {ref: threeApp.getKeyboardControls()});
player.addComponent(PlayerPointerControls, {ref: threeApp.getPointerControls()});
player.addComponent(PlayerCamera, {ref: threeApp.getCamera()});


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
