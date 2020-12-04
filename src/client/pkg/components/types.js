import { Vector2, Vector3 } from 'three';
import { createType, copyCopyable, cloneClonable } from 'ecsy';

export const Vector2Type = createType({
    name: 'Vector2',
    default: new Vector2(),
    copy: copyCopyable,
    clone: cloneClonable
});

export const Vector3Type = createType({
    name: 'Vector3',
    default: new Vector3(),
    copy: copyCopyable,
    clone: cloneClonable
});
