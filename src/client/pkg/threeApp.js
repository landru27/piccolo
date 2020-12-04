////////////////////////////////////////////////////////////////
////////  imports

import { setDefaultIfNotSet } from './jsm/utility/comparison.js';

import { Object3D, Vector3, Color } from 'three';
import { Clock, WebGLRenderer, Scene } from 'three';
import { AmbientLight, HemisphereLight, DirectionalLight } from 'three';
import { PerspectiveCamera } from 'three';
import { KeyUpAndDownControls } from './jsm/controls/KeyUpAndDownControls.js';
import { PointerLockControls } from './jsm/controls/PointerLockControls.js';


////////////////////////////////////////////////////////////////
////////  the top level elements of a running three.js application

export class ThreeApp {
    constructor(options) {
        // use the provided or default values
        this.devicePixelRatio = setDefaultIfNotSet(options.devicePixelRatio, 1);
        this.viewWidth = setDefaultIfNotSet(options.viewWidth, 256);
        this.viewHeight = setDefaultIfNotSet(options.viewHeight, 256);
        this.clearColor = setDefaultIfNotSet(options.clearColor, 0x000000);
        this.background = setDefaultIfNotSet(options.background, 0x000000);
        this.fieldOfView = setDefaultIfNotSet(options.fieldOfView, 45);
        this.aspectRatio = setDefaultIfNotSet(options.aspectRatio, (this.viewWidth / this.viewHeight));
        this.nearClippingPlane = setDefaultIfNotSet(options.nearClippingPlane, 0.1);
        this.farClippingPlane = setDefaultIfNotSet(options.farClippingPlane, 1000);
        this.cameraPosition = setDefaultIfNotSet(options.cameraPosition, new Vector3(3, 0, 6));
        this.cameraLookAt = setDefaultIfNotSet(options.cameraLookAt, new Vector3(0, 0, 0));
        this.keyboardControlDOMElement = setDefaultIfNotSet(options.keyboardControlDOMElement, document);
        this.pointerControlDOMElement = setDefaultIfNotSet(options.pointerControlDOMElement, document.body);

        // timing clock
        this.clock = new Clock();

        // WebGL renderer
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(this.devicePixelRatio);
        this.renderer.setSize(this.viewWidth, this.viewHeight);
        this.renderer.setClearColor(this.clearColor);

        // threejs scene
        this.scene = new Scene();
        this.scene.background = new Color(this.background);
        this.ambientLight = null;
        this.hemisphereLight = null;
        this.directionalLights = [];
        this.distanceFog = null;

        // user camera
        this.camera = new PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearClippingPlane, this.farClippingPlane);
        this.camera.position.copy(this.cameraPosition);
        this.camera.lookAt(this.cameraLookAt);

        // user controls
        this.keyboardControls = new KeyUpAndDownControls(this.keyboardControlDOMElement);
        this.pointerControls = new PointerLockControls(this.camera, this.pointerControlDOMElement);
        this.scene.add(this.pointerControls.getObject());
    }

    getRenderer() {
        return this.renderer;
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getPointerControls() {
        return this.pointerControls;
    }

    getKeyboardControls() {
        return this.keyboardControls;
    }

    getRenderDOMElement() {
        return this.renderer.domElement;
    }

    setAmbientLighting(options) {
        let color = setDefaultIfNotSet(options.color, 0x7F7F7F);
        let intensity = setDefaultIfNotSet(options.intensity, 1);

        this.ambientLight = new AmbientLight(color, intensity);
        this.scene.add(this.ambientLight);
    }

    setHemisphereLighting(options) {
        let skyColor = setDefaultIfNotSet(options.skyColor, 0xbbbbbb);
        let groundColor = setDefaultIfNotSet(options.groundColor, 0x444444);
        let intensity = setDefaultIfNotSet(options.intensity, 1);

        this.hemisphereLight = new HemisphereLight(skyColor, groundColor, intensity);
        this.scene.add(this.hemisphereLight);
    }

    addDirectionalLighting(options) {
        let color = setDefaultIfNotSet(options.color, 0x7F7F7F);
        let intensity = setDefaultIfNotSet(options.intensity, 1);
        let position = setDefaultIfNotSet(options.position, Object3D.DefaultUp);

        let light = new DirectionalLight(color, intensity);
        light.position.copy(position).normalize();
        this.directionalLights.push(light);
        this.scene.add(this.directionalLights[this.directionalLights.length - 1]);
    }

    setDistanceFog(options) {
        let color = setDefaultIfNotSet(options.color, 0xcccccc);
        let near = setDefaultIfNotSet(options.near, 300);
        let far = setDefaultIfNotSet(options.far, 3000);

        this.distanceFog = new Fog(color, near, far);
        this.scene.add(this.distanceFog);
    }

    resizeViewport(width, height) {
        this.viewWidth = width;
        this.viewHeight = height;
        this.aspectRatio = this.viewWidth / this.viewHeight;

        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.viewWidth, this.viewHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

////////////////////////////////////////////////////////////////
