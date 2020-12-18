////////////////////////////////////////////////////////////////
////////  imports

import { Euler, Vector3 } from 'three';

import { System } from 'ecsy';

import { PlayerTag, PlayerCamera } from '../components/Player.js';
import { SceneModel } from '../components/SceneModel.js';


////////////////////////////////////////////////////////////////
////////  system

export class PlayerCameraMotion extends System {
    init() {
        this.scope = this;
    }

    execute(delta) {
        const player = this.queries.player.results[0];
        const objref = player.getComponent(SceneModel).ref.sceneObject;
        const camera = player.getComponent(PlayerCamera).ref;

        camera.lookAt(objref.position);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};

////////////////////////////////////////////////////////////////
