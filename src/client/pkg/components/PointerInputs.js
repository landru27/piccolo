////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class PointerInputs extends Component {}

PointerInputs.schema = {
    mouseMovementX: { type: Types.Number },
    mouseMovementY: { type: Types.Number },
    mouseButtonClick: { type: Types.String },
};
