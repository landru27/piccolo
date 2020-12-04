////////  a universal test for variable definition
export function isDefined(x) {
    var undefined;
    return x !== undefined;
}

////////  use the current or the default value
export function setDefaultIfNotSet(value, defaultValue) {
    if (! isDefined(value)) {
        return defaultValue;
    }
    return value;
}

////////  numerical comparison, e.g. for numerical .sort()'ing
export function cmpQty(a, b) {
    if (a > b) { return -1; }
    if (a < b) { return  1; }
    return 0;
}
