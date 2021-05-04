////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class Globe extends Component {}

Globe.schema = {
    scene: { type: Types.Ref },
    icosphereOrder: { type: Types.Number },
    lodZeroOrder: { type: Types.Number },
    lodIncrementDistance: { type: Types.Number },
    viewDistance: { type: Types.Number },
};

////////////////////////////////////////////////////////////////
