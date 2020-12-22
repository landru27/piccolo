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

        this.follow = new Vector3();
    }

    execute(delta) {
        const player = this.queries.player.results[0];
        const objref = player.getComponent(SceneModel).ref.sceneObject;
        const camera = player.getComponent(PlayerCamera).ref;

        objref.getObjectByName('cameraFollow3rdPerson').getWorldPosition(this.follow);
        camera.position.lerp(this.follow, 0.1);

        objref.getObjectByName('head').getWorldPosition(this.follow);
        camera.lookAt(this.follow);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};

////////////////////////////////////////////////////////////////
