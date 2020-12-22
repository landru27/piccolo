////////////////////////////////////////////////////////////////
////////  imports

import { Object3D, Group, Color } from 'three';
import { Vector3, Quaternion } from 'three';
import { BoxGeometry } from 'three';
import { CylinderBufferGeometry } from 'three';
import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const PolyTheRobot = function() {

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
    iota.lookAt(-1, 0, -1);

    // body
    geometry = new CylinderBufferGeometry(0.4, 0.3, 1.1, 3, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 1.3, 0);
    mesh.name = 'body';
    iota.add(mesh);

    // head
    geometry = new CylinderBufferGeometry(0.3, 0.4, 0.2, 3, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 2.0, 0);
    mesh.name = 'head';
    iota.add(mesh);

    // leg
    geometry = new CylinderBufferGeometry(0.2, 0.1, 1.0, 3, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0.6, 0);
    mesh.name = 'leg';
    iota.add(mesh);

    // left wheel
    geometry = new CylinderBufferGeometry(0.25, 0.25, 0.2, 8, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0.2, -0.375, 0);
    mesh.rotateZ(Math.PI / 2);
    mesh.name = 'wheelLeft';
    iota.getObjectByName('leg').add(mesh);

    // right wheel
    geometry = new CylinderBufferGeometry(0.25, 0.25, 0.2, 8, 1);
    material = new MeshPhongMaterial({color: colorA});
    mesh = new Mesh(geometry, material);
    mesh.position.set(-0.2, -0.375, 0);
    mesh.rotateZ(Math.PI / 2);
    mesh.name = 'wheelRight';
    iota.getObjectByName('leg').add(mesh);

    // camera follow
    spot = new Object3D();
    spot.position.set(-1, 2.4, -6);
    spot.name = 'cameraFollow3rdPerson';
    iota.add(spot);

    return {
        sceneObject: iota,

        motionParameters: {
            accelerationForward: 10,
            accelerationBackward: -5,
            accelerationLeftward: 4,
            accelerationRightward: -4,
            accelerationUpward: 0,
            accelerationDownward: 0,
        },

        animation: function(velocity) {
            velocity.normalize();
            rotation.setFromUnitVectors(new Vector3(0, 0, 1), velocity);
            iota.getObjectByName('leg').setRotationFromQuaternion(rotation);
        },
    };
};

export { PolyTheRobot };

////////////////////////////////////////////////////////////////
