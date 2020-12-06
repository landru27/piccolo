////////////////////////////////////////////////////////////////
//
//  based on stats.js
//
//  https://github.com/mrdoob/stats.js
//
//  Copyright © 2009-2016 stats.js authors
//  see license at the bottom of this file
//
////////////////////////////////////////////////////////////////

const Statistics = function () {

    // parent statistics container
    const statsContainer = document.createElement( 'div' );
    statsContainer.style.cssText = 'position:fixed; top:8px; left:8px; z-index:99; display:block; opacity:0.8; background-color: rgba(255, 255, 255, 0.4); cursor:pointer;';

    // performance graphs
    const fpsContainer = document.createElement( 'div' );
    fpsContainer.style.cssText = 'display:inline-block; padding:4px;';
    statsContainer.appendChild(fpsContainer);
    const fpsPanel = new Statistics.GraphPanel('FPS', '#888888', '#ffffff');
    fpsContainer.appendChild(fpsPanel.domElement);

    const timeContainer = document.createElement( 'div' );
    timeContainer.style.cssText = 'display:inline-block; padding:4px;';
    statsContainer.appendChild(timeContainer);
    const timePanel = new Statistics.GraphPanel('MS', '#888888', '#ffffff');
    timeContainer.appendChild(timePanel.domElement);

    const memContainer = document.createElement( 'div' );
    memContainer.style.cssText = 'display:inline-block; padding:4px;';
    statsContainer.appendChild(memContainer);
    const memPanel = new Statistics.GraphPanel('MB', '#888888', '#ffffff');
    memContainer.appendChild(memPanel.domElement);

    // world information
    const infoContainer = document.createElement( 'div' );
    infoContainer.style.cssText = 'display:block; padding:4px;';
    statsContainer.appendChild(infoContainer);
    const infoPanel = new Statistics.InfoPanel('#888888', '#ffffff');
    infoContainer.appendChild(infoPanel.domElement);

    // initialize statistics
    let beginTime = performance.now();
    let prevTime = beginTime;
    let frames = 0;
    let infoz = [];

    return {
        domElement: statsContainer,

        begin: function() {
            beginTime = performance.now();
        },

        end: function() {
            frames++;

            const time = performance.now();

            timePanel.update(time - beginTime, 40);

            if (time >= prevTime + 1000) {
                fpsPanel.update((frames * 1000) / (time - prevTime), 100);

                prevTime = time;
                frames = 0;

                const memory = performance.memory;
                memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
            }

            infoPanel.update(infoz);

            return time;
        },

        update: function() {
            beginTime = this.end();
        },

        newInfo: function(newInfoz) {
            infoz = newInfoz;
        },
    };
};

Statistics.GraphPanel = function ( name, fg, bg ) {

    const PR = Math.round(window.devicePixelRatio || 1);

    let min = Infinity;
    let max = 0;

    const WIDTH = 80 * PR;
    const HEIGHT = 48 * PR;
    const TEXT_X = 3 * PR;
    const TEXT_Y = 2 * PR;
    const GRAPH_X = 3 * PR;
    const GRAPH_Y = 15 * PR;
    const GRAPH_WIDTH = 74 * PR;
    const GRAPH_HEIGHT = 30 * PR;

    const canvas = document.createElement( 'canvas' );
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = 'width:80px; height:48px; border:solid 2px #000000;';

    const context = canvas.getContext( '2d' );
    context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = 'top';

    context.fillStyle = bg;
    context.fillRect( 0, 0, WIDTH, HEIGHT );

    context.fillStyle = fg;
    context.fillText( name, TEXT_X, TEXT_Y );
    context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

    context.fillStyle = bg;
    context.globalAlpha = 0.8;
    context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

    const round = Math.round;

    return {
        domElement: canvas,

        update: function ( value, maxValue ) {
            min = Math.min( min, value );
            max = Math.max( max, value );

            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect( 0, 0, WIDTH, GRAPH_Y );
            context.fillStyle = fg;
            context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

            context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

            context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

            context.fillStyle = bg;
            context.globalAlpha = 0.8;
            context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );
        }
    };
};

Statistics.InfoPanel = function () {

    const paragraph = document.createElement( 'p' );
    paragraph.style.cssText = 'font:12px sans-serif;';

    return {
        domElement: paragraph,

        update: function (infoz) {
            let infozStr = '';
            for (let i = 0; i < infoz.length; i++) {
                infozStr += infoz[i] + '<br />';
            }
            paragraph.innerHTML = infozStr;
        }
    };
};

export { Statistics };

////////////////////////////////////////////////////////////////
//  The MIT License
//  
//  Copyright © 2009-2016 stats.js authors
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
