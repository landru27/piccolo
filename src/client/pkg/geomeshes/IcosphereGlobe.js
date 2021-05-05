////////////////////////////////////////////////////////////////
////////  imports

import { BufferGeometry, BufferAttribute } from 'three';
import { MeshStandardMaterial, Mesh } from 'three';


////////////////////////////////////////////////////////////////

const IcosphereGlobe = function(scene, icosphere) {

    const vertices = icosphere.vertices;
    const triangles = icosphere.triangles;

    const geometry = new BufferGeometry();

    const pos = new BufferAttribute(new Float32Array(vertices.length), 3);
    geometry.setAttribute('position', pos);
    geometry.attributes.position.array.set(vertices);
    geometry.attributes.position.needsUpdate = true;

    geometry.setAttribute('normal', pos);

    geometry.setIndex(new BufferAttribute(new Uint32Array(triangles.length), 1));
    geometry.index.array.set(triangles);
    geometry.index.needsUpdate = true;

    geometry.setDrawRange(0, triangles.length);

    const mesh = new Mesh(geometry, new MeshStandardMaterial({
        //color: 0x7f7f7f,
        color: 0x16a030,
        //opacity: 0.2,
        opacity: 0.8,
        transparent: true,
        metalness: 0.2,
        roughness: 0.4,
        flatShading: true,
    }));

    scene.add(mesh);
};

export { IcosphereGlobe };

////////////////////////////////////////////////////////////////
