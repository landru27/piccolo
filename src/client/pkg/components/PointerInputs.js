////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class PointerInputs extends Component {}

PointerInputs.schema = {
    mouseMovementX: { type: Types.Number },
    mouseMovementY: { type: Types.Number },
    mouseLeftClick: { type: Types.Boolean },
    mouseMiddleClick: { type: Types.Boolean },
    mouseRightClick: { type: Types.Boolean },
};
