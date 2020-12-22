////////////////////////////////////////////////////////////////
////////  imports

import { prng } from '../utility/random.js';

import { Object3D, Group, Color } from 'three';
import { BoxGeometry } from 'three';
import { CylinderBufferGeometry } from 'three';
import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const AddABunchOfCubes = function(scene, qty, range) {

    const scope = this;

    const prngen = prng(Date.now());

    let cube = null;

    for (let indx = 0; indx < qty; indx++) {
        let size = 0.1 + (prngen() * 4);
        let shade = 0.25 + (prngen() * 0.5);
        let posX = -range + (prngen() * (range * 2));
        let posY = size / 2;
        let posZ = -range + (prngen() * (range * 2));

        cube = new Mesh(new BoxGeometry(size, size, size), new MeshPhongMaterial({color: new Color(shade, shade, shade)}));
        cube.position.set(posX, posY, posZ);
        scene.add(cube);
    }
};

export { AddABunchOfCubes };

////////////////////////////////////////////////////////////////
