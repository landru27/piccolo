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
    }

    rotateFromPointerMotion(x, y, q) {
        this.euler.setFromQuaternion(q);

        this.euler.y -= x * 0.002;
        this.euler.x -= y * 0.002;
        this.euler.x = Math.max(this.limitMaxPolarAngle, Math.min(this.limitMinPolarAngle, this.euler.x));

        q.setFromEuler(this.euler);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};
