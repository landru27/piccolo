import { System } from 'ecsy';

import { GlobeHeightMap } from '../components/GlobeHeightMap.js';

export class Terrain extends System {
    execute(delta) {
    }
}

Terrain.queries = {
    entities: { components: [GlobeHeightMap] }
};
