////////////////////////////////////////////////////////////////

const KeyboardControl = function(cfg, src, dest) {

    const scope = this;

    //////// initialization

    this.config = cfg;
    this.domSource = src;
    this.dataSink = dest;

    this.commandTypeMap = new Map([
        ['DEFAULT', 'continuous'],
        ['toggleDebug', 'toggle'],
        ['toggleGravity', 'toggle'],
        ['screenshot', 'delay0500'],
    ]);

    this.commandDelayMap = new Map([
        ['screenshot', 0],
    ]);

    function onKeyDown(event) {
        const keycode = event.key;
        const repeat = event.repeat;
        const command = scope.config.get(keycode);
        const commandtype = scope.commandTypeMap.get(command);
        let mark;
        let diff;

        switch (commandtype) {
        case 'toggle':
            if (! repeat) {
                scope.dataSink[command] = true;
            }
            break;

        case 'delay500':
            mark = performance.now();
            diff = mark - scope.commandDelayMap.get(command);
            scope.commandDelayMap.set(command, mark);
            if (diff > 500) {
                scope.dataSink[command] = true;
            }
            break;

        default:
            scope.dataSink[command] = true;
        }
    }

    function onKeyUp(event) {
        const keycode = event.key;
        const command = scope.config.get(keycode);

        scope.dataSink[command] = false;
    }

    scope.domSource.addEventListener( 'keydown', onKeyDown, false );
    scope.domSource.addEventListener( 'keyup', onKeyUp, false );
};

export { KeyboardControl };

////////////////////////////////////////////////////////////////
