////////////////////////////////////////////////////////////////
////////  imports

import { Euler, Vector3 } from 'three';

import { System } from 'ecsy';

import { PlayerTag, PlayerCamera } from '../components/Player.js';
import { PlayerInputs } from '../components/PlayerInputs.js';


////////////////////////////////////////////////////////////////
////////  system

export class PlayerCameraMotion extends System {
    init() {
        this.scope = this;

        const halfPI = Math.PI / 2;
        const minPolarAngle = 0;
        const maxPolarAngle = Math.PI;
        this.limitMinPolarAngle = halfPI - minPolarAngle;
        this.limitMaxPolarAngle = halfPI - maxPolarAngle;

        this.euler = new Euler(0, 0, 0, 'YXZ');
        this.vec = new Vector3();
    }

    execute(delta) {
        const player = this.queries.player.results[0];
        const camera = player.getMutableComponent(PlayerCamera).ref;

        // apply mouse movement to camera rotation
        // TODO : apply mouse movement to player rotation and here we should just adjust the camera based on player-follow rules
        const pointerInput = player.getComponent(PlayerInputs).pointerInputs;
        this.rotateFromPointerMotion(pointerInput.mouseMovementX, pointerInput.mouseMovementY, camera.quaternion);
        pointerInput.mouseMovementX = 0;
        pointerInput.mouseMovementY = 0;

        if (pointerInput.mouseButtonClick != '') {
            console.log(pointerInput.mouseButtonClick);
            pointerInput.mouseButtonClick = '';
        }

        const keyboardInput = player.getComponent(PlayerInputs).keyboardInputs;
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
        if (keyboardInput.accelerateAhead == true) { console.log('accelerateAhead'); }
        if (keyboardInput.accelerateBack == true) { console.log('accelerateBack'); }
        if (keyboardInput.accelerateLeft == true) { console.log('accelerateLeft'); }
        if (keyboardInput.accelerateRight == true) { console.log('accelerateRight'); }
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

        this.euler.y -= x;
        this.euler.x -= y;
        this.euler.x = Math.max(this.limitMaxPolarAngle, Math.min(this.limitMinPolarAngle, this.euler.x));

        q.setFromEuler(this.euler);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};
