////////  show a number to a given degree of precision
export function toNPlaces(n, precision) {
    return Number.parseFloat(n).toFixed(precision);
}

////////  show a number to 4 decimal places
export function to4Places(n) {
    return toNPlaces(n, 4);
}

////////  show the components of a 2D vector to 4 decimal places
export function vector2To4Places(v) {
    return to4Places(v.x) + ', ' + to4Places(v.y);
}

////////  show the components of a 3D vector to 4 decimal places
export function vector3To4Places(v) {
    return to4Places(v.x) + ', ' + to4Places(v.y) + ', ' + to4Places(v.z);
}
