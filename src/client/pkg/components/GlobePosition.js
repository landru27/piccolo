////////////////////////////////////////////////////////////////
////////  imports

import { Component, Types } from 'ecsy';


////////////////////////////////////////////////////////////////
////////  component

export class GlobePosition extends Component {}

GlobePosition.schema = {
    gridX: { type: Types.Number },
    gridY: { type: Types.Number },
    gridH: { type: Types.Number },
};

////////////////////////////////////////////////////////////////
