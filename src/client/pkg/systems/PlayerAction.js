////////////////////////////////////////////////////////////////
////////  imports

import { Euler, Vector3, Quaternion } from 'three';

import { System } from 'ecsy';

import { PlayerTag } from '../components/Player.js';
import { PlayerInputs } from '../components/PlayerInputs.js';
import { SceneModel } from '../components/SceneModel.js';
import { Anima } from '../components/Anima.js';


////////////////////////////////////////////////////////////////
////////  system

export class PlayerAction extends System {
    init() {
        this.scope = this;

        const halfPI = Math.PI / 2;
        const minPolarAngle = 0;
        const maxPolarAngle = Math.PI;
        this.limitMinPolarAngle = halfPI - minPolarAngle;
        this.limitMaxPolarAngle = halfPI - maxPolarAngle;

        this.euler = new Euler(0, 0, 0, 'YXZ');
        this.vec = new Vector3();
        this.quat = new Quaternion();

        this.slewX = new Vector3(0.1, 0, 0);
        this.slewY = new Vector3(0, 0.1, 0);
        this.slewZ = new Vector3(0, 0, 0.1);
        this.slewR =  0.01745329251;
        this.slewQ = -0.01745329251;
    }

    execute(delta) {
        const player = this.queries.player.results[0];
        const modref = player.getMutableComponent(SceneModel).ref;
        const objref = player.getMutableComponent(SceneModel).ref.sceneObject;
        const aniref = player.getMutableComponent(Anima);

        // apply mouse movement to scene object rotation
        const pointerInput = player.getComponent(PlayerInputs).pointerInputs;
        this.rotateFromPointerMotion(pointerInput.mouseMovementX, pointerInput.mouseMovementY, objref.quaternion);
        pointerInput.mouseMovementX = 0;
        pointerInput.mouseMovementY = 0;

        // act on mouse clicks
        if (pointerInput.mouseButtonClick != '') {
            console.log(pointerInput.mouseButtonClick);
            pointerInput.mouseButtonClick = '';
        }

        // apply commands from keyboard input
        const keyboardInput = player.getComponent(PlayerInputs).keyboardInputs;
        this.moveFromKeyboardCommands(keyboardInput, modref, aniref);

        // simple animation
        this.vec.copy(aniref.velocity);
        modref.animation(this.vec);
    }

    moveFromKeyboardCommands(keyboardInput, modref, aniref) {
        if (keyboardInput.slewXPos == true) { modref.sceneObject.position.add(this.slewX); }
        if (keyboardInput.slewXNeg == true) { modref.sceneObject.position.sub(this.slewX); }
        if (keyboardInput.slewYPos == true) { modref.sceneObject.position.add(this.slewY); }
        if (keyboardInput.slewYNeg == true) { modref.sceneObject.position.sub(this.slewY); }
        if (keyboardInput.slewZPos == true) { modref.sceneObject.position.add(this.slewZ); }
        if (keyboardInput.slewZNeg == true) { modref.sceneObject.position.sub(this.slewZ); }

        if (keyboardInput.rotateXPos == true) { modref.sceneObject.rotateX(this.slewR); }
        if (keyboardInput.rotateXNeg == true) { modref.sceneObject.rotateX(this.slewQ); }
        if (keyboardInput.rotateYPos == true) { modref.sceneObject.rotateY(this.slewR); }
        if (keyboardInput.rotateYNeg == true) { modref.sceneObject.rotateY(this.slewQ); }
        if (keyboardInput.rotateZPos == true) { modref.sceneObject.rotateZ(this.slewR); }
        if (keyboardInput.rotateZNeg == true) { modref.sceneObject.rotateZ(this.slewQ); }

        if (keyboardInput.accelerateAhead == true) {
            aniref.acceleration.setZ(modref.motionParameters.accelerationForward);
        } else if (keyboardInput.accelerateBack == true) {
            aniref.acceleration.setZ(modref.motionParameters.accelerationBackward);
        } else {
            aniref.acceleration.setZ(0);
        }

        if (keyboardInput.accelerateLeft == true) {
            aniref.acceleration.setX(modref.motionParameters.accelerationLeftward);
        } else if (keyboardInput.accelerateRight == true) {
            aniref.acceleration.setX(modref.motionParameters.accelerationRightward);
        } else {
            aniref.acceleration.setX(0);
        }

        if (keyboardInput.accelerateUp == true) {
            aniref.acceleration.setY(modref.motionParameters.accelerationUpward);
        } else if (keyboardInput.accelerateDown == true) {
            aniref.acceleration.setY(modref.motionParameters.accelerationDownward);
        } else {
            aniref.acceleration.setY(0);
        }

        if (keyboardInput.boostAcceleration == true) { console.log('boostAcceleration'); }
        if (keyboardInput.decelerateAll == true) { console.log('decelerateAll'); }
        if (keyboardInput.toggleGravity == true) { console.log('toggleGravity'); keyboardInput.toggleGravity = false; }

        if (keyboardInput.toggleDebug == true) { console.log('toggleDebug'); keyboardInput.toggleDebug = false; }
        if (keyboardInput.screenshot == true) { console.log('screenshot'); keyboardInput.screenshot = false; }
    }

    rotateFromPointerMotion(x, y, q) {
        this.euler.setFromQuaternion(q);

        // yaw
        this.euler.y -= x;

        // pitch - normal
        this.euler.x += y;
        // pitch - look inversion
        //this.euler.x -= y;
        // pitch - none, for surface travel
        //this.euler.x = 0;

        this.euler.x = Math.max(this.limitMaxPolarAngle, Math.min(this.limitMinPolarAngle, this.euler.x));

        q.setFromEuler(this.euler);
    }
}

PlayerAction.queries = {
    player: { components: [PlayerTag] }
};

////////////////////////////////////////////////////////////////
