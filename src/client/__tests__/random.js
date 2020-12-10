import { prng } from '../pkg/utility/random.js';

const prngen = prng('foobar');

describe('seeded pseudorandom number generation', () => {
    test('seed: foobar', () => {
        expect(prngen()).toBe(0.38537607062608004);
        expect(prngen()).toBe(0.99262582114897670);
        expect(prngen()).toBe(0.24443161115050316);
        expect(prngen()).toBe(0.13784489873796701);
        expect(prngen()).toBe(0.34771877224557100);
        expect(prngen()).toBe(0.97026024339720610);
        expect(prngen()).toBe(0.21285232063382864);
        expect(prngen()).toBe(0.53410855703987180);
    });
});

