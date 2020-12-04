////////////////////////////////////////////////////////////////

var KeyUpAndDownControls = function(domElement) {
    let scope = this;
    this.domElement = domElement;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveJump = false;

    function onKeyDown(event) {
        switch (event.keyCode) {
        case 38: // up
        case 87: // w
            scope.moveForward = true;
            break;

        case 37: // left
        case 65: // a
            scope.moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            scope.moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            scope.moveRight = true;
            break;

        case 32: // space
            scope.moveJump = true;
            break;
        }
    }

    function onKeyUp(event) {
        switch (event.keyCode) {
        case 38: // up
        case 87: // w
            scope.moveForward = false;
            break;

        case 37: // left
        case 65: // a
            scope.moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            scope.moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            scope.moveRight = false;
            break;

        case 32: // space
            scope.moveJump = false;
            break;
        }
    }

    this.init = function () {
        scope.domElement.addEventListener( 'keydown', onKeyDown, false );
        scope.domElement.addEventListener( 'keyup', onKeyUp, false );
    };

    this.getMovement = function () {
        //this.moveForward = true;
        return {
            moveForward: this.moveForward,
            moveBackward: this.moveBackward,
            moveLeft: this.moveLeft,
            moveRight: this.moveRight,
            moveJump: this.moveJump,
        };
    };

    this.init();
};

export { KeyUpAndDownControls };

////////////////////////////////////////////////////////////////
