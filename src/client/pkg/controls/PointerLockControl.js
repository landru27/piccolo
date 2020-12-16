////////////////////////////////////////////////////////////////
//
//  based on three.js PointerLockControls example
//
//  https://threejs.org/examples/misc_controls_pointerlock.html
//  https://threejs.org/examples/jsm/controls/PointerLockControls.js
//  https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/PointerLockControls.js
//
//  Copyright © 2010-2020 three.js authors
//  see license at the bottom of this file
//
////////////////////////////////////////////////////////////////

const PointerLockControl = function(cfg, src, dest) {

    const scope = this;

    //////// initialization

    this.config = cfg;
    this.domSource = src;
    this.dataSink = dest;
    this.domOverlay = null;
    this.isLocked = false;

    //////// pointer locking and unlocking

    this.initiatePointerLock = function(elem) {
        scope.domOverlay = elem;
        scope.domSource.requestPointerLock();
    }

    this.relinquishPointerLock = function() {
        scope.domSource.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange, false);
        scope.domSource.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError, false);
        scope.domSource.ownerDocument.removeEventListener('mousemove', onMouseMove, false);

        scope.domSource.ownerDocument.exitPointerLock();
    }

    function onPointerlockChange() {
        if (scope.domSource.ownerDocument.pointerLockElement === scope.domSource) {
            scope.domOverlay.style.display = 'none';
            scope.isLocked = true;
        } else {
            scope.isLocked = false;
            scope.domOverlay.style.display = 'block';
        }
    }

    function onPointerlockError() {
        console.error('PointerLockControl: unable to use Pointer Lock API at this exact moment');
    }

    //////// update our datasink with pointer movement

    function onMouseMove(event) {
        if (!scope.isLocked) { return; }

        let mouseMovementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let mouseMovementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        scope.dataSink.mouseMovementX = mouseMovementX * scope.config.lookSensativity;
        scope.dataSink.mouseMovementY = mouseMovementY * scope.config.lookSensativity;
    }

    function onMouseClick(event) {
        if (!scope.isLocked) { return; }

        let whichButton = 'non';
        switch (event.button) {
            case 0:
                whichButton = 'leftClick';
                break;
            case 1:
                whichButton = 'middleClick';
                break;
            case 2:
                whichButton = 'rightClick';
                break;
            default:
                return;
        }

        scope.dataSink.mouseButtonClick = scope.config[whichButton];
    }

    this.domSource.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange, false);
    this.domSource.ownerDocument.addEventListener('pointerlockerror', onPointerlockError, false);
    this.domSource.ownerDocument.addEventListener('mousemove', onMouseMove, false);
    this.domSource.ownerDocument.addEventListener('click', onMouseClick, false);
};

export { PointerLockControl };

////////////////////////////////////////////////////////////////
//  The MIT License
//  
//  Copyright © 2010-2020 three.js authors
//  
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//  
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//  
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//  
////////////////////////////////////////////////////////////////
