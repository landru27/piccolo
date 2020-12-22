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
    }

    execute(delta) {
        const player = this.queries.player.results[0];
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
        this.moveFromKeyboardCommands(keyboardInput, aniref);

        // simple animation
        this.vec.copy(aniref.velocity);
        this.vec.normalize();
        this.quat.setFromUnitVectors(new Vector3(0, 0, 1), this.vec);
        objref.getObjectByName('leg').setRotationFromQuaternion(this.quat);
    }

    moveFromKeyboardCommands(keyboardInput, aniref) {
        if (keyboardInput.slewXPos == true) { console.log('slewXPos'); }
        if (keyboardInput.slewXNeg == true) { console.log('slewXNeg'); }
        if (keyboardInput.slewYPos == true) { console.log('slewYPos'); }
        if (keyboardInput.slewYNeg == true) { console.log('slewYNeg'); }
        if (keyboardInput.slewZPos == true) { console.log('slewZPos'); }
        if (keyboardInput.slewZNeg == true) { console.log('slewZNeg'); }

        if (keyboardInput.rotateXPos == true) { console.log('rotateXPos'); }
        if (keyboardInput.rotateXNeg == true) { console.log('rotateXNeg'); }
        if (keyboardInput.rotateYPos == true) { console.log('rotateYPos'); }
        if (keyboardInput.rotateYNeg == true) { console.log('rotateYNeg'); }
        if (keyboardInput.rotateZPos == true) { console.log('rotateZPos'); }
        if (keyboardInput.rotateZNeg == true) { console.log('rotateZNeg'); }

        if (keyboardInput.accelerateAhead == true) {
            console.log('accelerateAhead');
            aniref.velocity = aniref.velocity.add(new Vector3(0, 0, 1));
        }
        if (keyboardInput.accelerateBack == true) {
            console.log('accelerateBack');
            aniref.velocity = aniref.velocity.add(new Vector3(0, 0, -1));
        }
        if (keyboardInput.accelerateLeft == true) {
            console.log('accelerateLeft');
            aniref.velocity = aniref.velocity.add(new Vector3(1, 0, 0));
        }
        if (keyboardInput.accelerateRight == true) {
            console.log('accelerateRight');
            aniref.velocity = aniref.velocity.add(new Vector3(-1, 0, 0));
        }
        if (keyboardInput.accelerateUp == true) { console.log('accelerateUp'); }
        if (keyboardInput.accelerateDown == true) { console.log('accelerateDown'); }

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
