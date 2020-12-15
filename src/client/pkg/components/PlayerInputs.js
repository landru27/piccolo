////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class PlayerInputs extends Component {}

PlayerInputs.schema = {
    pointerInputs: { type: Types.Ref },
    keyboardInputs: { type: Types.Ref },
};
