////////////////////////////////////////////////////////////////
////////  imports

import { setDefaultIfNoValue } from './utility/comparison.js';

import { Object3D, Vector3, Color } from 'three';
import { Clock, Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three';
import { KeyUpAndDownControls } from './controls/KeyUpAndDownControls.js';
import { PointerLockControls } from './controls/PointerLockControls.js';


////////////////////////////////////////////////////////////////
////////  the top level elements of a running three.js application

const ThreeApp = function(options) {

    const scope = this;

    // use the provided or default values
    let devicePixelRatio = setDefaultIfNoValue(options.devicePixelRatio, 1);
    let appContainerDOMElement = setDefaultIfNoValue(options.appContainerDOMElement, 'appContainer');
    let appOverlayDOMElement = setDefaultIfNoValue(options.appOverlayDOMElement, 'appOverlay');
    let keyboardControlsDOMElement = setDefaultIfNoValue(options.keyboardControlsDOMElement, document);
    let pointerControlsDOMElement = setDefaultIfNoValue(options.pointerControlsDOMElement, document.body);
    let clearColor = setDefaultIfNoValue(options.clearColor, 0x000000);
    let background = setDefaultIfNoValue(options.background, 0x000000);
    let fieldOfView = setDefaultIfNoValue(options.fieldOfView, 45);
    let nearClippingPlane = setDefaultIfNoValue(options.nearClippingPlane, 0.1);
    let farClippingPlane = setDefaultIfNoValue(options.farClippingPlane, 1000);
    let cameraPosition = setDefaultIfNoValue(options.cameraPosition, new Vector3(3, 0, 6));
    let cameraLookAt = setDefaultIfNoValue(options.cameraLookAt, new Vector3(0, 0, 0));

    // viewport
    let appContainer = document.getElementById(appContainerDOMElement);
    let appOverlay = document.getElementById(appOverlayDOMElement);
    let viewportWidth = appContainer.clientWidth;
    let viewportHeight = appContainer.clientHeight;
    let aspectRatio = (viewportWidth / viewportHeight);

    // user controls
    let keyboardControls = new KeyUpAndDownControls(keyboardControlsDOMElement);
    let pointerControls = new PointerLockControls(pointerControlsDOMElement);

    // timing clock
    let clock = new Clock();

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
        pointerControls.lock();
    }, false);

    pointerControls.addEventListener('lock', function () {
        appOverlay.style.display = 'none';
    });

    pointerControls.addEventListener('unlock', function () {
        appOverlay.style.display = 'block';
    });

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
        }
    }

    ////////////////////////////////

    this.getPointerControls = function() {
        return pointerControls;
    }

    this.getKeyboardControls = function() {
        return keyboardControls;
    }

    this.getScene = function() {
        return scene;
    }

    this.getCamera = function() {
        return camera;
    }

    this.getRenderer = function() {
        return renderer;
    }

    ////////////////////////////////

    this.resizeViewport = function() {
        viewportWidth = appContainer.clientWidth;
        viewportHeight = appContainer.clientHeight;
        aspectRatio = viewportWidth / viewportHeight;

        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();

        renderer.setSize(viewportWidth, viewportHeight);
    }

    this.render = function() {
        renderer.render(scene, camera);
    }
};

export { ThreeApp };

////////////////////////////////////////////////////////////////
