import * as comparison from '../pkg/utility/comparison.js';

describe('variable definition', () => {
    test('is defined', () => {
        let isundefined;
        expect(comparison.isUndefined(isundefined)).toBe(true);
        expect(comparison.isDefined(isundefined)).toBe(false);

        let isdefined = 27;
        expect(comparison.isUndefined(isdefined)).toBe(false);
        expect(comparison.isDefined(isdefined)).toBe(true);
    });

    test('has value', () => {
        let isundefined;
        expect(comparison.hasNoValue(isundefined)).toBe(true);
        expect(comparison.hasAValue(isundefined)).toBe(false);

        let issettonull = null;
        expect(comparison.hasNoValue(issettonull)).toBe(true);
        expect(comparison.hasAValue(issettonull)).toBe(false);

        let issettovalue = 'something';
        expect(comparison.hasNoValue(issettovalue)).toBe(false);
        expect(comparison.hasAValue(issettovalue)).toBe(true);
    });

    test('set to given or default', () => {
        expect(comparison.setDefaultIfNoValue(undefined, undefined)).toBe(undefined);
        expect(comparison.setDefaultIfNoValue(undefined, null)).toBe(null);
        expect(comparison.setDefaultIfNoValue(null, undefined)).toBe(undefined);
        expect(comparison.setDefaultIfNoValue(null, null)).toBe(null);

        expect(comparison.setDefaultIfNoValue(undefined, 'default a')).toBe('default a');

        expect(comparison.setDefaultIfNoValue(null, 'default b')).toBe('default b');

        let notyetdefined;
        expect(comparison.setDefaultIfNoValue(notyetdefined, 'default c')).toBe('default c');
        expect(comparison.setDefaultIfNoValue(notyetdefined, null)).toBe(null);

        let hasbeendefined = 'given value d';
        expect(comparison.setDefaultIfNoValue(hasbeendefined, 'default d')).toBe('given value d');
        expect(comparison.setDefaultIfNoValue(hasbeendefined, undefined)).toBe('given value d');
        expect(comparison.setDefaultIfNoValue(hasbeendefined, null)).toBe('given value d');

        let hasbeendefinedasnull = null;
        expect(comparison.setDefaultIfNoValue(hasbeendefinedasnull, 'default e')).toBe('default e');
        expect(comparison.setDefaultIfNoValue(hasbeendefinedasnull, undefined)).toBe(undefined);
        expect(comparison.setDefaultIfNoValue(hasbeendefinedasnull, null)).toBe(null);
    });

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

    test('numerical ordering', () => {
        expect(comparison.cmpQty(3, 7)).toBe(-1);
        expect(comparison.cmpQty(3, 3)).toBe(0);
        expect(comparison.cmpQty(7, 7)).toBe(0);
        expect(comparison.cmpQty(7, 3)).toBe(1);

        expect(comparison.cmpQty(1, 10)).toBe(-1);
        expect(comparison.cmpQty(1, 1)).toBe(0);
        expect(comparison.cmpQty(10, 10)).toBe(0);
        expect(comparison.cmpQty(10, 1)).toBe(1);

        expect(comparison.cmpQty(18, 123)).toBe(-1);
        expect(comparison.cmpQty(123, 18)).toBe(1);

        let numarray = [40, 1, 5, 200];
        let lexicallysortedarray = [1, 200, 40, 5];
        let numericallysortedarray = [1, 5, 40, 200];
        expect(numarray.sort()).toEqualArray(lexicallysortedarray);
        expect(numarray.sort(comparison.cmpQty)).toEqualArray(numericallysortedarray);
    });
});
