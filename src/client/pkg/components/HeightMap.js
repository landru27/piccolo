////////////////////////////////////////////////////////////////
////////  imports

import { prng } from '../utility/random.js';

import { BufferGeometry, BufferAttribute } from 'three';
import { Mesh, MeshPhongMaterial } from 'three';

import { Component, Types } from 'ecsy';

////////////////////////////////////////////////////////////////
////////  component

export class HeightMap extends Component {
    constructor() {
        super(true);

        const sqrt3 = 1.73205080757;
        const sqrt3half = sqrt3 * 0.5;

        const unit = 1.0;
        const unithalf = unit * 0.5;

        const gridsize = 1000;

        const prngen = prng('foobar');

        let rawVertices = [];
        for (let i = 0; i < (gridsize + 1); i++) {
            for (let j = 0; j < (gridsize + 1); j++) {

                let x = (j * unit) + (i * unithalf);
                let z = (i * sqrt3half);
                let y = Math.sin(x / 16) * (3 * Math.cos(z / 7));
                y = y + prngen();
                y = Math.max(y, 0);
                y = y + (prngen() * 0.1);

                rawVertices.push(x, y, z);
            }
        }

        let rawFaces = [];
        for (let i = 0; i < gridsize; i++) {
            for (let j = 0; j < gridsize; j++) {

                let a = (i * (gridsize + 1)) + j;
                let b = a + 1;
                let c = a + (gridsize + 1);
                let d = c + 1;

                rawFaces.push(a, c, b);
                rawFaces.push(b, c, d);
            }
        }

        let geometryVertices = new Float32Array(gridsize * gridsize * 2 * 3 * 3);
        let indxGeometryVertices = 0;
        const rawFacesLength = rawFaces.length;
        for (let i = 0; i < rawFacesLength; i += 3) {
            let vertIndxA = rawFaces[i] * 3;
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxA];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxA+1];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxA+2];

            let vertIndxB = rawFaces[i+1] * 3;
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxB];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxB+1];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxB+2];

            let vertIndxC = rawFaces[i+2] * 3;
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxC];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxC+1];
            geometryVertices[indxGeometryVertices++] = rawVertices[vertIndxC+2];
        }

        this.geometry = new BufferGeometry();
        this.geometry.setAttribute('position', new BufferAttribute(geometryVertices, 3));

        this.material = new MeshPhongMaterial({
            flatShading: true,
            shininess: 0,
            color: 0x228B22,
        });

        this.mesh = new Mesh(this.geometry, this.material);
    }
}

HeightMap.schema = {
    geometry: { type: Types.Ref },
    material: { type: Types.Ref },
    mesh: { type: Types.Ref },
    flatShading: { type: Types.Boolean, default: true },
};
