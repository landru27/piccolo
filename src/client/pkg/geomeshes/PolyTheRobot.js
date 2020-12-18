////////////////////////////////////////////////////////////////
////////  imports

import { Group } from 'three';
import { CylinderBufferGeometry } from 'three';
import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const PolyTheRobot = function() {

    const scope = this;

    let geometry = null;
    let material = null;
    let mesh = null;

    const iota = new Group();

    // body
    geometry = new CylinderBufferGeometry(0.4, 0.3, 1.1, 3, 1);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 1.3, 0);
    iota.add(mesh);

    // leg
    geometry = new CylinderBufferGeometry(0.2, 0.1, 1.0, 3, 1);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0.6, 0);
    iota.add(mesh);

    // head
    geometry = new CylinderBufferGeometry(0.3, 0.4, 0.2, 3, 1);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0, 2.0, 0);
    iota.add(mesh);

    // left wheel
    geometry = new CylinderBufferGeometry(0.25, 0.25, 0.2, 8, 1);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    mesh.position.set(0.2, 0.25, 0);
    mesh.rotateZ(Math.PI / 2);
    iota.add(mesh);

    // right wheel
    geometry = new CylinderBufferGeometry(0.25, 0.25, 0.2, 8, 1);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    mesh.position.set(-0.2, 0.25, 0);
    mesh.rotateZ(Math.PI / 2);
    iota.add(mesh);

    return {
        sceneObject: iota,
    };
};

export { PolyTheRobot };

////////////////////////////////////////////////////////////////
