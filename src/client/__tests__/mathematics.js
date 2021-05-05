import * as constants from '../pkg/geometry/MathematicalConstants.js';

describe('variable definition', () => {
    test('locally defined mathematical constants', () => {
        expect( constants.MATH_E       ).toEqual( 2.7182818284590452 );
        expect( constants.MATH_LN2     ).toEqual( 0.6931471805599453 );
        expect( constants.MATH_LN10    ).toEqual( 2.3025850929940457 );
        expect( constants.MATH_LOG2E   ).toEqual( 1.4426950408889634 );
        expect( constants.MATH_LOG10E  ).toEqual( 0.4342944819032518 );
        expect( constants.MATH_PHI     ).toEqual( 1.6180339887498948 );
        expect( constants.MATH_PI      ).toEqual( 3.1415926535897932 );
        expect( constants.MATH_SQRT1_2 ).toEqual( 0.7071067811865476 );
        expect( constants.MATH_SQRT2   ).toEqual( 1.4142135623730951 );
        expect( constants.MATH_SQRT3   ).toEqual( 1.7320508075688773 );
        expect( constants.MATH_SQRT5   ).toEqual( 2.2360679774997897 );
    });
});
