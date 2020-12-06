import { System } from 'ecsy';

import { HeightMap } from '../components/HeightMap.js';

export class Terrain extends System {
    execute(delta) {
    }
}

Terrain.queries = {
    entities: { components: [HeightMap] }
};
