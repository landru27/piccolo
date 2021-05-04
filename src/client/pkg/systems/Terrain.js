import { System } from 'ecsy';

import { Globe } from '../components/Globe.js';
import { GlobePosition } from '../components/GlobePosition.js';

import { Icosphere } from '../geometry/Icosphere.js';
import { IcosphereGlobe } from '../geomeshes/IcosphereGlobe.js';

export class Terrain extends System {
    init() {
        this.scope = this;

        //console.log(this.world);

        this.initializeGlobe = false;
    }

    execute(delta) {
        const globe = this.queries.globe.results[0];
        const sceneref = globe.getComponent(Globe).scene;
        const order = globe.getComponent(Globe).icosphereOrder;
        const lodzero = globe.getComponent(Globe).lodZeroOrder;
        const logincr = globe.getComponent(Globe).lodIncrementDistance;
        const viewdist = globe.getComponent(Globe).viewDistance;

        if (this.initializeGlobe == false) {
            const icosphere = Icosphere(128, order);
            IcosphereGlobe(sceneref, icosphere);

            this.initializeGlobe = true;
        }
    }
}

Terrain.queries = {
    globe: { components: [Globe] },
    globeposition: { components: [GlobePosition] }
};
