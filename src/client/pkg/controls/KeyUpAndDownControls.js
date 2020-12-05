////////////////////////////////////////////////////////////////

var KeyUpAndDownControls = function(domElement) {
    let scope = this;
    this.domElement = domElement;

    this.toggleStats = false;
    this.toggleGravity = false;
    this.toggleXYZPositive = false;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeftward = false;
    this.moveRightward = false;
    this.moveUpward = false;
    this.moveDownward = false;

    this.moveJump = false;

    this.slewForward = false;
    this.slewBackward = false;
    this.slewLeftward = false;
    this.slewRightward = false;
    this.slewUpward = false;
    this.slewDownward = false;

    function onKeyDown(event) {
        onKeyEvent(event.keyCode, true);
    }
    function onKeyUp(event) {
        onKeyEvent(event.keyCode, false);
    }

    function onKeyEvent(keycode, flag) {
        switch (keycode) {
        case 73: // i
            scope.toggleStats = flag;
            break;

        case 71: // h
            scope.toggleGravity = flag;
            break;

        case 66: // b
            scope.toggleXYZPositive = flag;
            break;



        case 87: // w
            scope.moveForward = flag;
            break;

        case 83: // s
            scope.moveBackward = flag;
            break;

        case 65: // a
            scope.moveLeftward = flag;
            break;

        case 68: // d
            scope.moveRightward = flag;
            break;

        case 69: // e
            scope.moveUpward = flag;
            break;

        case 81: // q
            scope.moveDownward = flag;
            break;

        case 32: // space
            scope.moveJump = flag;
            break;



        case 38: // up arrow
            scope.slewForward = flag;
            break;

        case 40: // down arrow
            scope.slewBackward = flag;
            break;

        case 37: // left arrow
            scope.slewLeftward = flag;
            break;

        case 39: // right arrow
            scope.slewRightward = flag;
            break;

        case 82: // r
            scope.slewUpward = flag;
            break;

        case 70: // f
            scope.slewDownward = flag;
            break;
        }
    }

    this.init = function () {
        scope.domElement.addEventListener( 'keydown', onKeyDown, false );
        scope.domElement.addEventListener( 'keyup', onKeyUp, false );
    };

    this.getCommands = function () {
        return {
            toggleStats: this.toggleStats,
            toggleGravity: this.toggleGravity,
            toggleXYZPositive: this.toggleXYZPositive,
        };
    };

    this.getMovement = function () {
        return {
            moveForward: this.moveForward,
            moveBackward: this.moveBackward,
            moveLeftward: this.moveLeftward,
            moveRightward: this.moveRightward,
            moveUpward: this.moveUpward,
            moveDownward: this.moveDownward,

            moveJump: this.moveJump,

            slewForward: this.slewForward,
            slewBackward: this.slewBackward,
            slewLeftward: this.slewLeftward,
            slewRightward: this.slewRightward,
            slewUpward: this.slewUpward,
            slewDownward: this.slewDownward,
        };
    };

    this.init();
};

export { KeyUpAndDownControls };

////////////////////////////////////////////////////////////////
