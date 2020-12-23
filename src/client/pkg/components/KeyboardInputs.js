////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class KeyboardInputs extends Component {}

KeyboardInputs.schema = {
    slewXPos: { type: Types.Boolean },
    slewXNeg: { type: Types.Boolean },
    slewYPos: { type: Types.Boolean },
    slewYNeg: { type: Types.Boolean },
    slewZPos: { type: Types.Boolean },
    slewZNeg: { type: Types.Boolean },

    rotateXPos: { type: Types.Boolean },
    rotateXNeg: { type: Types.Boolean },
    rotateYPos: { type: Types.Boolean },
    rotateYNeg: { type: Types.Boolean },
    rotateZPos: { type: Types.Boolean },
    rotateZNeg: { type: Types.Boolean },

    accelerateAhead: { type: Types.Boolean },
    accelerateBack: { type: Types.Boolean },
    accelerateLeft: { type: Types.Boolean },
    accelerateRight: { type: Types.Boolean },
    accelerateUp: { type: Types.Boolean },
    accelerateDown: { type: Types.Boolean },

    switchAvatar: { type: Types.Boolean },

    boostAcceleration: { type: Types.Boolean },
    decelerateAll: { type: Types.Boolean },

    toggleGravity: { type: Types.Boolean },
    toggleDebug: { type: Types.Boolean },
    screenshot: { type: Types.Boolean },
};

////////////////////////////////////////////////////////////////
