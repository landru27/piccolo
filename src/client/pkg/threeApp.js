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

export class ThreeApp {

    constructor(options) {
        const scope = this;

        // use the provided or default values
        this.devicePixelRatio = setDefaultIfNoValue(options.devicePixelRatio, 1);
        this.appContainerDOMElement = setDefaultIfNoValue(options.appContainerDOMElement, 'appContainer');
        this.appOverlayDOMElement = setDefaultIfNoValue(options.appOverlayDOMElement, 'appOverlay');
        this.keyboardControlsDOMElement = setDefaultIfNoValue(options.keyboardControlsDOMElement, document);
        this.pointerControlsDOMElement = setDefaultIfNoValue(options.pointerControlsDOMElement, document.body);
        this.clearColor = setDefaultIfNoValue(options.clearColor, 0x000000);
        this.background = setDefaultIfNoValue(options.background, 0x000000);
        this.fieldOfView = setDefaultIfNoValue(options.fieldOfView, 45);
        this.nearClippingPlane = setDefaultIfNoValue(options.nearClippingPlane, 0.1);
        this.farClippingPlane = setDefaultIfNoValue(options.farClippingPlane, 1000);
        this.cameraPosition = setDefaultIfNoValue(options.cameraPosition, new Vector3(3, 0, 6));
        this.cameraLookAt = setDefaultIfNoValue(options.cameraLookAt, new Vector3(0, 0, 0));

        // viewport
        this.appContainer = document.getElementById(this.appContainerDOMElement);
        this.appOverlay = document.getElementById(this.appOverlayDOMElement);
        this.viewportWidth = appContainer.clientWidth;
        this.viewportHeight = appContainer.clientHeight;
        this.aspectRatio = (this.viewportWidth / this.viewportHeight);

        // user controls
        this.keyboardControls = new KeyUpAndDownControls(this.keyboardControlsDOMElement);
        this.pointerControls = new PointerLockControls(this.pointerControlsDOMElement);

        // timing clock
        this.clock = new Clock();

        // threejs scene
        this.scene = new Scene();
        this.scene.background = new Color(this.background);

        // user camera
        this.camera = new PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearClippingPlane, this.farClippingPlane);
        this.camera.position.copy(this.cameraPosition);
        this.camera.lookAt(this.cameraLookAt);
        this.scene.add(this.camera);

        // WebGL renderer
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(this.devicePixelRatio);
        this.renderer.setSize(this.viewportWidth, this.viewportHeight);
        this.renderer.setClearColor(this.clearColor);

        // connect this three.js app to its execution environment
        this.appContainer.append(this.renderer.domElement);

        this.appOverlay.addEventListener('click', function () {
            scope.pointerControls.lock();
        }, false);

        this.pointerControls.addEventListener('lock', function () {
            scope.appOverlay.style.display = 'none';
        });

        this.pointerControls.addEventListener('unlock', function () {
            scope.appOverlay.style.display = 'block';
        });
    }

    ////////////////////////////////

    getAppContainer() {
        return this.appContainer;
    }

    getAppOverlay() {
        return this.appOverlay;
    }

    getViewportSize() {
        return {
            width: this.viewportWidth,
            height: this.viewportHeight,
        }
    }

    ////////////////////////////////

    getPointerControls() {
        return this.pointerControls;
    }

    getKeyboardControls() {
        return this.keyboardControls;
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getRenderer() {
        return this.renderer;
    }

    ////////////////////////////////

    resizeViewport() {
        this.viewportWidth = appContainer.clientWidth;
        this.viewportHeight = appContainer.clientHeight;
        this.aspectRatio = this.viewportWidth / this.viewportHeight;

        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.viewportWidth, this.viewportHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

////////////////////////////////////////////////////////////////
