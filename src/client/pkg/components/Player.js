////////////////////////////////////////////////////////////////
////////  imports

import { Component, TagComponent, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  components

export class PlayerTag extends TagComponent {}


export class PlayerKeyboardControls extends Component {}

PlayerKeyboardControls.schema = {
    ref: { type: Types.Ref }
};


export class PlayerPointerControls extends Component {}

PlayerPointerControls.schema = {
    ref: { type: Types.Ref }
};


export class PlayerCamera extends Component {}

PlayerCamera.schema = {
    ref: { type: Types.Ref }
};
