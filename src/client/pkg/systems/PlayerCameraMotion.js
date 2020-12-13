////////////////////////////////////////////////////////////////
////////  imports

import { System } from 'ecsy';

import { PlayerTag, PlayerKeyboardControls, PlayerPointerControls, PlayerCamera } from '../components/Player.js';


////////////////////////////////////////////////////////////////
////////  system

export class PlayerCameraMotion extends System {
    execute(delta) {
        const player = this.queries.player.results[0];
        const camera = player.getMutableComponent(PlayerCamera);
        const pointerControls = player.getComponent(PlayerPointerControls);
        pointerControls.ref.applyUpdate(camera.ref.quaternion);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};
