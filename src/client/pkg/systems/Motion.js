////////////////////////////////////////////////////////////////
////////  imports

import { Vector3 } from 'three';

import { System } from 'ecsy';

import { Anima } from '../components/Anima.js';
import { SceneModel } from '../components/SceneModel.js';


////////////////////////////////////////////////////////////////
////////  system

export class Motion extends System {
    init() {
        this.scope = this;

        this.drag = 0.01;
        this.friction = 0.96;
    }

    execute(delta) {
        this.queries.anima.results.forEach(entity => {
            const objref = entity.getMutableComponent(SceneModel).ref.sceneObject;
            const aniref = entity.getMutableComponent(Anima);

            // propulsion
            const deltaAcceleration = new Vector3();
            deltaAcceleration.copy(aniref.acceleration);
            deltaAcceleration.multiplyScalar(delta);
            aniref.velocity = aniref.velocity.add(deltaAcceleration);

            // drag
            const speed = aniref.velocity.length();
            const deltaDrag = new Vector3();
            deltaDrag.copy(aniref.velocity);
            deltaDrag.normalize();
            deltaDrag.multiplyScalar(this.drag * (0.5 * (speed * speed)));
            deltaDrag.multiplyScalar(delta);
            aniref.velocity = aniref.velocity.sub(deltaDrag);

            // friction
            aniref.velocity.multiplyScalar(1 - (this.friction * delta));

            // movement
            const deltaVelocity = new Vector3();
            deltaVelocity.copy(aniref.velocity);
            deltaVelocity.multiplyScalar(delta);
            objref.position.add(deltaVelocity);
        });
    }
}

Motion.queries = {
    anima: { components: [Anima] }
};

////////////////////////////////////////////////////////////////
