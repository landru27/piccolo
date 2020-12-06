////////////////////////////////////////////////////////////////
//
//  from:
//  https://github.com/bryc/code/blob/master/jshash/PRNGs.md
//
//  License: Public domain. Software licenses are annoying. If
//  your code is sacred, don't publish it. If you want to mess
//  with people, golf your code or only release binaries. If
//  your country lacks a public domain, you should probably
//  start a revolution.
//
//  additional info at:
//  https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316
//
////////////////////////////////////////////////////////////////

export function prng(seedstr) {
    const seed = xmur3(seedstr);
    const rand = sfc32(seed(), seed(), seed(), seed());

    return rand;
}

function sfc32(a, b, c, d) {
    return function() {
      a |= 0; b |= 0; c |= 0; d |= 0; 
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = c << 21 | c >>> 11;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
