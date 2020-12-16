////////////////////////////////////////////////////////////////
////////  imports

import { Group, Shape } from 'three';
import { BoxBufferGeometry, ExtrudeBufferGeometry, TetrahedronBufferGeometry } from 'three';
import { MeshPhongMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const PolyTheRobot = function() {

    const scope = this;

    let geometry = null;
    let material = null;
    let mesh = null;

    const iota = new Group();

    geometry = new BoxBufferGeometry(0.25, 0.125, 0.5);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    //iota.add(mesh);

    const length = 0.1, width = 1.0;
    const shape = new Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );
    const extruder = {
        steps: 1,
        depth: 1.0,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 1.0,
        bevelOffset: 0,
        bevelSegments: 2,
    };
    geometry = new ExtrudeBufferGeometry(shape, extruder);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    iota.add(mesh);

    geometry = new TetrahedronBufferGeometry(1.0);
    material = new MeshPhongMaterial({color: 0xb0c4de});
    mesh = new Mesh(geometry, material);
    //mesh.rotateY(Math.PI / 4);
    //mesh.rotateZ(- Math.PI / 3);
    //mesh.rotateX( Math.PI / 16);
    mesh.position.set(0, 2.25, 0);
    iota.add(mesh);

    return {
        sceneObject: iota,
    };
};

export { PolyTheRobot };

////////////////////////////////////////////////////////////////
