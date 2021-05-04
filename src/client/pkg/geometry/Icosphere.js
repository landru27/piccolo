////////////////////////////////////////////////////////////////
////////  imports


////////////////////////////////////////////////////////////////

const Icosphere = function(size, order) {

    const scope = this;

    // define select mathematical constants
    const pi    = 3.1415926535897932;
    const sqrt5 = 2.2360679774997897;
    const phi   = 1.6180339887498948;

    // define some icosphere parameters
    const tessellation = 4 ** order;
    const qtyVertices = 10 * tessellation + 2;
    const qtyTriangles = 20 * tessellation;

    // set up data structures for icosphere data
    let vertices = new Float32Array(qtyVertices * 3);
    let normals = new Float32Array(qtyVertices * 3);
    let triangles = new Uint32Array(20 * 3);

    ////////////////////////////////////////////////////////////////
    // set up a regular icosahedron as our initial, order-0 icosphere

    // after : http://csharphelper.com/blog/2015/12/platonic-solids-part-6-the-icosahedron/
    // s1 scales the size to match the other calculation method, below
    //
    // const s1 = size / 0.9510565162951535;
    // const a1 = 2.0 * pi / 5.0;                                // t1
    // const a2 = pi / 10.0;                                     // t2
    // const a3 = a1 - a2;        // or, 3.0 * Math.PI / 10.0    // t3
    // const a4 = pi / 5.0;                                      // t4
    // const d0 = 0.0;
    // const d1 = (s1 / 2.0) / Math.sin(a4);                     // R
    // const d2 = Math.cos(a4) * d1;                             // H
    // const d3 = d1 * Math.sin(a2);                             // Cx
    // const d4 = d1 * Math.cos(a2);                             // Cz
    // const c1 = Math.sqrt(s1 * s1 - d1 * d1);                  // H1
    // const c2 = Math.sqrt((d2 + d1) * (d2 + d1) - d2 * d2);    // H2
    // const d5 = s1 / 2.0;
    // const d6 = (c2 - c1) / 2.0;                               // Y2
    // const d7 = d6 + c1;                                       // Y1

    // after : https://math.stackexchange.com/a/2174924
    //
    const d0 = 0.0;
    const d1 = 2.0 / sqrt5;
    const d2 =           (5 + sqrt5) / 10;
    const d3 =           (5 - sqrt5) / 10;
    const d4 = Math.sqrt((5 + sqrt5) / 10);
    const d5 = Math.sqrt((5 - sqrt5) / 10);
    const d6 = 1.0 / sqrt5;
    const d7 = 1.0;

    vertices.set(Float32Array.of(
         d0, -d7,  d0,
         d3, -d6,  d4,
         d1, -d6,  d0,
         d3, -d6, -d4,
        -d2, -d6, -d5,
        -d2, -d6,  d5,
         d2,  d6,  d5,
         d2,  d6, -d5,
        -d3,  d6, -d4,
        -d1,  d6,  d0,
        -d3,  d6,  d4,
         d0,  d7,  d0,
    ));
    //console.log(JSON.stringify(vertices, null, 2));

    triangles.set(Uint32Array.of(
        0, 2, 1,
        0, 3, 2,
        0, 4, 3,
        0, 5, 4,
        0, 1, 5,
        1, 2, 6,
        2, 7, 6,
        2, 3, 7,
        3, 8, 7,
        3, 4, 8,
        4, 9, 8,
        4, 5, 9,
        5, 10, 9,
        5, 1, 10,
        1, 6, 10,
        6, 7, 11,
        7, 8, 11,
        8, 9, 11,
        9, 10, 11,
        10, 6, 11,
    ));
    //console.log(JSON.stringify(triangles, null, 2));

    ////////////////////////////////////////////////////////////////
    // midpoint vertices cache to avoid duplicating shared vertices
    let v = 12;
    const midCache = order ? new Map() : null;

    function addMidPoint(a, b) {
        // Cantor's pairing function
        const key = Math.floor((a + b) * (a + b + 1) / 2) + Math.min(a, b);

        let i = midCache.get(key);
        if (i !== undefined) { midCache.delete(key); return i; }

        midCache.set(key, v);
        for (let k = 0; k < 3; k++) {
            vertices[3 * v + k] = (vertices[3 * a + k] + vertices[3 * b + k]) / 2;
        }
        i = v++;

        return i;
    }

    ////////////////////////////////////////////////////////////////
    // repeatedly subdivide each triangle into 4 triangles
    let trianglesPrev = triangles;
    for (let i = 0; i < order; i++) {
        triangles = new Uint32Array(trianglesPrev.length * 4);

        for (let k = 0; k < trianglesPrev.length; k += 3) {
            const v1 = trianglesPrev[k + 0];
            const v2 = trianglesPrev[k + 1];
            const v3 = trianglesPrev[k + 2];

            const a = addMidPoint(v1, v2);
            const b = addMidPoint(v2, v3);
            const c = addMidPoint(v3, v1);

            let t = k * 4;
            triangles[t++] = v1; triangles[t++] = a; triangles[t++] = c;
            triangles[t++] = v2; triangles[t++] = b; triangles[t++] = a;
            triangles[t++] = v3; triangles[t++] = c; triangles[t++] = b;
            triangles[t++] = a;  triangles[t++] = b; triangles[t++] = c;
        }
        trianglesPrev = triangles;
    }

    ////////////////////////////////////////////////////////////////
    // normalize vertices
    for (let i = 0; i < vertices.length; i += 3) {
        let m = 1 / Math.hypot(vertices[i + 0], vertices[i + 1], vertices[i + 2]);
        m *= size;
        vertices[i + 0] *= m;
        vertices[i + 1] *= m;
        vertices[i + 2] *= m;
    }

    ////////////////////////////////////////////////////////////////
    // return the various details as an 'icosphere' object
    return {
        size: size,
        order: order,
        tessellation: tessellation,
        vertices: vertices,
        triangles: triangles,
        normals: normals,
    };
};

export { Icosphere };

////////////////////////////////////////////////////////////////
