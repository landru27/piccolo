////////////////////////////////////////////////////////////////

const Config = function() {
    return {
        app: {
            containerDOMElement: 'appContainer',
            overlayDOMElement: 'appOverlay',
            backgroundColor: 'skyblue',
            fieldOfVision: 40,
            nearClippingPlane: 0.1,
            farClippingPlane: 1000,
        },

        pointer: {
            leftClick: 'primary',
            rightClick: 'secondary',
            middleClick: 'tertiary',
            lookSensativity: 0.002,
        },

        keyboard: new Map([
            // the ASCII alphabet
            ['a', 'accelerateLeft'],
            ['b', 'toggleBoundaries'],
            ['c', 'accelerateDown'],
            ['d', 'accelerateRight'],
            ['e', 'accelerateUp'],
            ['f', 'BUFFER'],
            ['g', 'toggleGravity'],
            ['h', ''],
            ['i', ''],
            ['j', ''],
            ['k', ''],
            ['l', ''],
            ['m', ''],
            ['n', ''],
            ['o', ''],
            ['p', 'switchAvatar'],
            ['q', 'slewYPos'],
            ['r', 'BUFFER'],
            ['s', 'accelerateBack'],
            ['t', ''],
            ['u', ''],
            ['v', 'BUFFER'],
            ['w', 'accelerateAhead'],
            ['x', 'decelerateAll'],
            ['y', ''],
            ['z', 'slewYNeg'],

            // spacebar
            [' ', ''],

            // lefthand
            ['Tab', ''],
            ['CapsLock', ''],
            ['Shift', 'boostAcceleration'],
            ['Control', ''],

            // righthand
            ['Backspace', 'toggleDebug'],
            ['Enter', ''],
            ['Alt', ''],
            ['Meta', ''],

            // arrow group
            ['ArrowUp', 'slewZPos'],
            ['ArrowLeft', 'slewXNeg'],
            ['ArrowDown', 'slewZNeg'],
            ['ArrowRight', 'slewXPos'],

            // navigation-editing group
            ['Help', 'rotateZNeg'],
            ['Insert', 'rotateZNeg'],
            ['Delete', 'rotateYPos'],
            ['Home', 'rotateXPos'],
            ['End', 'rotateXNeg'],
            ['PageUp', 'rotateZPos'],
            ['PageDown', 'rotateYNeg'],

            // numeral
            ['1', ''],
            ['2', ''],
            ['3', ''],
            ['4', ''],
            ['5', ''],
            ['6', ''],
            ['7', ''],
            ['8', ''],
            ['9', ''],
            ['0', ''],

            // multipurpose function
            ['F1', ''],
            ['F2', ''],
            ['F3', ''],
            ['F4', ''],
            ['F5', ''],
            ['F6', ''],
            ['F7', ''],
            ['F8', ''],
            ['F9', ''],
            ['F10', ''],
            ['F11', ''],
            ['F12', ''],

            // screenshot
            ['F13', 'screenshot'],
            ['PrintScreen', 'screenshot'],

            // punctuation
            ['-', ''],
            ['=', ''],
            ['[', ''],
            [']', ''],
            ['\\', ''],
            [';', ''],
            ['\'', ''],
            [',', ''],
            ['.', ''],
            ['/', ''],
            ['`', ''],

            // do not use Escape - it is used to exit the world app
            ['Esc', 'DO_NOT_USE'],
            ['Escape', 'DO_NOT_USE'],
        ])
    };
};

export { Config };

////////////////////////////////////////////////////////////////
