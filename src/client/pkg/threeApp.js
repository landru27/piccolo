////////////////////////////////////////////////////////////////
////////  imports

import { setDefaultIfNotSet } from './jsm/utility/comparison.js';

import { Object3D, Color } from 'three';
import { Clock, WebGLRenderer, Scene } from 'three';
import { AmbientLight, HemisphereLight, DirectionalLight } from 'three';


////////////////////////////////////////////////////////////////
////////  the top level elements of a running three.js application

export class ThreeApp {
    constructor(options) {
        // use the provided or default values
        this.devicePixelRatio = setDefaultIfNotSet(options.devicePixelRatio, 1);
        this.viewWidth = setDefaultIfNotSet(options.viewWidth, 256);
        this.viewHeight = setDefaultIfNotSet(options.viewHeight, 256);
        this.ClearColor = setDefaultIfNotSet(options.ClearColor, 0x000000);
        this.Background = setDefaultIfNotSet(options.Background, 0x000000);

        // timing clock
        this.clock = new Clock();

        // WebGL renderer
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(this.devicePixelRatio);
        this.renderer.setSize(this.viewWidth, this.viewHeight);
        this.renderer.setClearColor( this.ClearColor );

        // threejs scene
        this.scene = new Scene();
        this.scene.background = new Color(this.Background);

        // declare other instance variables
        this.ambientLight = null;
        this.hemisphereLight = null;
        this.directionalLights = [];
        this.distanceFog = null;
    }

    getRenderer() {
        return this.renderer;
    }

    getDOMElement() {
        return this.renderer.domElement;
    }

    getScene() {
        return this.scene;
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
}

////////////////////////////////////////////////////////////////
