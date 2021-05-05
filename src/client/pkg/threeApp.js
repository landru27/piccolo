////////////////////////////////////////////////////////////////
////////  imports

import { setDefaultIfNoValue } from './utility/comparison.js';

import { Vector3, Color } from 'three';
import { Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three';

import { PointerLockControl } from './controls/PointerLockControl.js';
import { KeyboardControl } from './controls/KeyboardControl.js';

import { PointerInputs } from './components/PointerInputs.js';
import { KeyboardInputs } from './components/KeyboardInputs.js';


////////////////////////////////////////////////////////////////
////////  the top level elements of a running three.js application

const ThreeApp = function(config, options) {

    // configuration settings
    const appConfig = config;

    // use the provided or default values
    let devicePixelRatio = setDefaultIfNoValue(options.devicePixelRatio, 1);
    let appContainerDOMElement = setDefaultIfNoValue(options.appContainerDOMElement, 'appContainer');
    let appOverlayDOMElement = setDefaultIfNoValue(options.appOverlayDOMElement, 'appOverlay');
    let pointerControlDOMElement = setDefaultIfNoValue(options.pointerControlDOMElement, document.body);
    let keyboardControlDOMElement = setDefaultIfNoValue(options.keyboardControlDOMElement, document);
    let clearColor = setDefaultIfNoValue(options.clearColor, 0x000000);
    let background = setDefaultIfNoValue(options.background, 0x000000);
    let fieldOfView = setDefaultIfNoValue(options.fieldOfView, 45);
    let nearClippingPlane = setDefaultIfNoValue(options.nearClippingPlane, 0.1);
    let farClippingPlane = setDefaultIfNoValue(options.farClippingPlane, 1000);
    let cameraPosition = setDefaultIfNoValue(options.cameraPosition, new Vector3(3, 0, 6));
    let cameraLookAt = setDefaultIfNoValue(options.cameraLookAt, new Vector3(0, 0, 0));

    // viewport
    let appContainer = document.getElementById(appContainerDOMElement);
    let viewportWidth = appContainer.clientWidth;
    let viewportHeight = appContainer.clientHeight;
    let aspectRatio = (viewportWidth / viewportHeight);

    // user controls
    let appOverlay = document.getElementById(appOverlayDOMElement);
    let pointerInputs = new PointerInputs();
    let pointerControl = new PointerLockControl(appConfig.pointer, pointerControlDOMElement, pointerInputs);
    let keyboardInputs = new KeyboardInputs();
    let keyboardControl = new KeyboardControl(appConfig.keyboard, keyboardControlDOMElement, keyboardInputs);

    // threejs scene
    let scene = new Scene();
    scene.background = new Color(background);

    // user camera
    let camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane);
    camera.position.copy(cameraPosition);
    camera.lookAt(cameraLookAt);
    scene.add(camera);

    // WebGL renderer
    let renderer = new WebGLRenderer();
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setClearColor(clearColor);

    // connect this three.js app to its execution environment
    appContainer.append(renderer.domElement);

    appOverlay.addEventListener('click', function () {
        pointerControl.initiatePointerLock(appOverlay);
    }, false);

    ////////////////////////////////

    function getAppContainer() {
        return appContainer;
    }

    function getAppOverlay() {
        return appOverlay;
    }

    function getViewportSize() {
        return {
            width: viewportWidth,
            height: viewportHeight,
        };
    }

    ////////////////////////////////

    this.getPointerControl = function() {
        return pointerControl;
    };

    this.getPointerInputs = function() {
        return pointerInputs;
    };

    this.getKeyboardControl = function() {
        return keyboardControl;
    };

    this.getKeyboardInputs = function() {
        return keyboardInputs;
    };

    this.getScene = function() {
        return scene;
    };

    this.getCamera = function() {
        return camera;
    };

    this.getRenderer = function() {
        return renderer;
    };

    ////////////////////////////////

    this.resizeViewport = function() {
        viewportWidth = appContainer.clientWidth;
        viewportHeight = appContainer.clientHeight;
        aspectRatio = viewportWidth / viewportHeight;

        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();

        renderer.setSize(viewportWidth, viewportHeight);
    };

    this.render = function() {
        renderer.render(scene, camera);
    };
};

export { ThreeApp };

////////////////////////////////////////////////////////////////
