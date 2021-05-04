////////////////////////////////////////////////////////////////
////////  imports

import { Object3D, Group } from 'three';
//import { CylinderBufferGeometry } from 'three';
//import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const ETE = function() {

    const scope = this;

    let spot = null;

    const iota = new Group();
    iota.position.set(32, 0, 256);
    iota.lookAt(0, 0, 0);

    // E.T.E. : Emerson's Transparent Eyeball : a reference to Ralph Waldo Emerson's
    // essay, Nature :
    //
    // [a person] needs to retire as much from [their] chamber as from society"[1] to
    // uninhabited places like the woods where -- (...) we return to reason and faith.
    // There I feel that nothing can befall me in life, -- no disgrace, no calamity,
    // (leaving me my eyes,) which nature cannot repair. Standing on the bare ground, --
    // my head bathed by the blithe air, and uplifted into infinite spaces, -- all mean
    // egotism vanishes. I become a transparent eye-ball; I am nothing; I see all; the
    // currents of the Universal Being circulate through me; I am part or particle of
    // God.[1]
    //
    // as-quoted, from Wikipedia : https://en.wikipedia.org/wiki/Transparent_eyeball

    // here, rather than the pursuit of sublime inner peace, the "transparent eyeball"
    // is an avatar for the camera to follow without itself showing up in the scene

    spot = new Object3D();
    spot.position.set(0, 0, 0);
    spot.name = 'cameraFollow3rdPerson';
    iota.add(spot);

    return {
        sceneObject: iota,

        motionParameters: {
            surfaceTravel: false,
            accelerationForward: 64,
            accelerationBackward: -64,
            accelerationLeftward: 64,
            accelerationRightward: -64,
            accelerationUpward: 64,
            accelerationDownward: -64,
        },

        animation: function(params) { },
    };
};

export { ETE };

////////////////////////////////////////////////////////////////
