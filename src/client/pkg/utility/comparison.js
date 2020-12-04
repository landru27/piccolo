////////  a universal test for variable non-definition
export function isUndefined(x) {
    return x === undefined;
}

////////  a universal test for variable definition
export function isDefined(x) {
    return x !== undefined;
}

////////  a universal test for no usable value
export function hasNoValue(x) {
    if (isUndefined(x)) { return true; }
    return x === null;
}

////////  a universal test for a usable value
export function hasAValue(x) {
    if (isUndefined(x)) { return false; }
    return x !== null;
}

////////  use the current or the default value
export function setDefaultIfNoValue(value, defaultValue) {
    if (hasNoValue(value)) {
        return defaultValue;
    }
    return value;
}

////////  numerical comparison, e.g. for numerical .sort()'ing
export function cmpQty(a, b) {
    if (a > b) { return  1; }
    if (a < b) { return -1; }
    return 0;
}
