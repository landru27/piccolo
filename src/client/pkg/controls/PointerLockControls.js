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

import { Euler, EventDispatcher, Vector3 } from 'three';

var PointerLockControls = function (camera, domElement) {

    //////// initialization
    if (domElement === undefined) {
        domElement = document.body;
    }
    this.domElement = domElement;

    var scope = this;

    //////// pointer locking and unlocking
    this.isLocked = false;

    var lockEvent = { type: 'lock' };
    var unlockEvent = { type: 'unlock' };
    var changeEvent = { type: 'change' };

    function onPointerlockChange() {
        if (scope.domElement.ownerDocument.pointerLockElement === scope.domElement) {
            scope.dispatchEvent(lockEvent);
            scope.isLocked = true;
        } else {
            scope.dispatchEvent(unlockEvent);
            scope.isLocked = false;
        }
    }

    function onPointerlockError() {
        console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    }

    this.connect = function () {
        scope.domElement.ownerDocument.addEventListener('mousemove', onMouseMove, false);
        scope.domElement.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange, false);
        scope.domElement.ownerDocument.addEventListener('pointerlockerror', onPointerlockError, false);
    };

    this.lock = function () {
        this.domElement.requestPointerLock();
    };

    this.unlock = function () {
        scope.domElement.ownerDocument.exitPointerLock();
    };

    this.disconnect = function () {
        scope.domElement.ownerDocument.removeEventListener('mousemove', onMouseMove, false);
        scope.domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange, false);
        scope.domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError, false);
    };

    this.dispose = function () {
        this.disconnect();
    };

    this.getCamera = function () { // retaining this method for backward compatibility
        return camera;
    };

    //////// rotation and movement

    // constrain the pitch of the camera; range is 0 to Math.PI radians
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;

    var euler = new Euler(0, 0, 0, 'YXZ');
    var PI_2 = Math.PI / 2;
    var vec = new Vector3();

    this.getDirection = function () {
        var direction = new Vector3(0, 0, -1);
        return function (v) {
            return v.copy(direction).applyQuaternion(camera.quaternion);
        };
    }();

    function onMouseMove(event) {
        if (scope.isLocked === false) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        euler.setFromQuaternion(camera.quaternion);
        // TODO : add the ability to set look-sensitivity, and then replace these hard-coded values
        euler.y -= movementX * 0.002;
        euler.x -= movementY * 0.002;
        euler.x = Math.max(PI_2 - scope.maxPolarAngle, Math.min(PI_2 - scope.minPolarAngle, euler.x));
        camera.quaternion.setFromEuler(euler);

        scope.dispatchEvent(changeEvent);
    }

    this.moveForward = function (distance) {
        camera.getWorldDirection(vec);
        camera.position.addScaledVector(vec, distance);
    };

    this.moveForwardXZ = function (distance) {
        vec.setFromMatrixColumn(camera.matrix, 0);
        vec.crossVectors(camera.up, vec);
        camera.position.addScaledVector(vec, distance);
    };

    this.moveForwardXY = function () {
    };

    this.moveForwardYZ = function () {
    };

    this.moveRightward = function (distance) {
        vec.setFromMatrixColumn(camera.matrix, 0);
        camera.position.addScaledVector(vec, distance);
    };

    this.moveUpward = function (distance) {
        vec.setFromMatrixColumn(camera.matrix, 1);
        camera.position.addScaledVector(vec, distance);
    };

    this.connect();
};

PointerLockControls.prototype = Object.create(EventDispatcher.prototype);
PointerLockControls.prototype.constructor = PointerLockControls;

export { PointerLockControls };

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
