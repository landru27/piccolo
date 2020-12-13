////////////////////////////////////////////////////////////////
////////  imports

import { prng } from '../utility/random.js';

import { BufferGeometry, BufferAttribute } from 'three';
import { Mesh, MeshPhongMaterial } from 'three';

import { Component, Types } from 'ecsy';

////////////////////////////////////////////////////////////////
////////  component

export class GlobeHeightMap extends Component {
    constructor() {
        super(true);

        //this.geometry = new BufferGeometry();
        //this.geometry.setAttribute('position', new BufferAttribute(geometryVertices, 3));

        //this.material = new MeshPhongMaterial({
        //    shininess: 0,
        //    color: 0x228B22,
        //});

        //this.mesh = new Mesh(this.geometry, this.material);
    }
}

GlobeHeightMap.schema = {
    geometry: { type: Types.Ref },
    material: { type: Types.Ref },
    mesh: { type: Types.Ref },
    flatShading: { type: Types.Boolean, default: true },
};
