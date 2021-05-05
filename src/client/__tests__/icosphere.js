import * as icosphere from '../pkg/geometry/Icosphere.js';

describe('variable definition', () => {
    expect.extend({
        toEqualArray(received, expected) {
            const pass = this.equals(received, expected);
            if (pass) {
                return {
                    message: () => `expected ${received} not to be an array equal to ${expected}`,
                    pass: true,
                };
            } else {
                return {
                    message: () => `expected ${received} to be an array equal to ${expected}`,
                    pass: false,
                };
            }
        },
    });

    test('order 0 icosphere : icosahedron', () => {
        const order0vertices = Float32Array.of(
            +0,                   -1,                   0,
            +0.27639320492744446, -0.4472135901451111,  0.8506507873535156,
            +0.8944271802902222,  -0.4472135901451111,  0,
            +0.27639320492744446, -0.4472135901451111, -0.8506507873535156,
            -0.7236068248748779,  -0.4472135901451111, -0.525731086730957,
            -0.7236068248748779,  -0.4472135901451111,  0.525731086730957,
            +0.7236068248748779,   0.4472135901451111,  0.525731086730957,
            +0.7236068248748779,   0.4472135901451111, -0.525731086730957,
            -0.27639320492744446,  0.4472135901451111, -0.8506507873535156,
            -0.8944271802902222,   0.4472135901451111,  0,
            -0.27639320492744446,  0.4472135901451111,  0.8506507873535156,
            +0,                    1,                   0,
        );
        const order0triangles = Uint32Array.of(
            0,  2,  1,
            0,  3,  2,
            0,  4,  3,
            0,  5,  4,
            0,  1,  5,
            1,  2,  6,
            2,  7,  6,
            2,  3,  7,
            3,  8,  7,
            3,  4,  8,
            4,  9,  8,
            4,  5,  9,
            5,  10, 9,
            5,  1,  10,
            1,  6,  10,
            6,  7,  11,
            7,  8,  11,
            8,  9,  11,
            9,  10, 11,
            10, 6,  11,
        );

        const order0 = icosphere.Icosphere(1, 0);

        expect(order0.vertices).toEqualArray(order0vertices);
        expect(order0.triangles).toEqualArray(order0triangles);
    });
});
