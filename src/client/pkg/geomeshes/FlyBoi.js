////////////////////////////////////////////////////////////////
////////  imports

import { Object3D, Group, Color } from 'three';
import { Euler, Vector3, Quaternion } from 'three';
import { BoxGeometry } from 'three';
import { CylinderBufferGeometry } from 'three';
import { ConeBufferGeometry } from 'three';
import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const FlyBoi = function() {

    const scope = this;

    let geometry = null;
    let material = null;
    let mesh = null;
    let spot = null;

    const colorA = 0xb0c4de;
    const colorB = 0xff7f7f;
    const colorC = new Color('steelblue');

    const rotation = new Quaternion();

    const iota = new Group();
    iota.lookAt(0, 0, 1);

    // canopy
    geometry = new CylinderBufferGeometry(0.4, 0.8, 0.2, 3, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0.15, 0);
    mesh.name = 'canopy';
    iota.add(mesh);

    // belly
    //geometry = new ConeBufferGeometry(0.8, 2.0, 3, 1, false, 0.0, Math.PI * 2);
    geometry = new CylinderBufferGeometry(0.8, 0.1, 0.1, 3, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    //mesh.rotateZ(Math.PI / 2);
    //mesh.rotateX(Math.PI / 2);
    mesh.name = 'belly';
    iota.add(mesh);

    // camera follow
    spot = new Object3D();
    spot.position.set(0, 1, -8);
    spot.name = 'cameraFollow3rdPerson';
    iota.add(spot);

    let currBank = 0;
    let prevBank = 0;

    return {
        sceneObject: iota,

        motionParameters: {
            accelerationForward: 64,
            accelerationBackward: 0,
            accelerationLeftward: 0,
            accelerationRightward: 0,
            accelerationUpward: 8,
            accelerationDownward: 16,
        },

        animation: function(params) {
            iota.rotateZ(-prevBank);
            currBank = (Math.PI / 180) * (params.pointerMoveX * 256);
            prevBank = currBank;
            iota.rotateZ(currBank);
        },
    };
};

export { FlyBoi };

////////////////////////////////////////////////////////////////
