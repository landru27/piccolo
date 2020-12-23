////////////////////////////////////////////////////////////////
////////  imports

import { Vector3, Quaternion } from 'three';

import { System } from 'ecsy';

import { PlayerTag, PlayerCamera } from '../components/Player.js';
import { SceneModel } from '../components/SceneModel.js';


////////////////////////////////////////////////////////////////
////////  system

export class PlayerCameraMotion extends System {
    init() {
        this.scope = this;

        this.followPos = new Vector3();
        this.followRotA = new Quaternion();
        this.followRotB = new Quaternion();
        this.followRotC = new Quaternion();

        this.oppositeDirection = new Quaternion(0, 1, 0, 0);
    }

    execute(delta) {
        const player = this.queries.player.results[0];
        const objref = player.getComponent(SceneModel).ref.sceneObject;
        const camera = player.getComponent(PlayerCamera).ref;

        // ease to the follow view position
        objref.getObjectByName('cameraFollow3rdPerson').getWorldPosition(this.followPos);
        camera.position.lerp(this.followPos, 0.1);

        // ease to the follow view direction
        // cameras look along their negative-Z axis, so we flip the camera rotation
        // in order to properly compare it, then flip it back to properly apply it
        camera.getWorldQuaternion(this.followRotA);
        this.followRotA.normalize();
        this.followRotA.multiply(this.oppositeDirection);
        objref.getWorldQuaternion(this.followRotB);
        this.followRotB.normalize();
        Quaternion.slerp( this.followRotA, this.followRotB, this.followRotC, 0.1 );
        this.followRotC.multiply(this.oppositeDirection);
        camera.setRotationFromQuaternion(this.followRotC);
    }
}

PlayerCameraMotion.queries = {
    player: { components: [PlayerTag] }
};

////////////////////////////////////////////////////////////////
