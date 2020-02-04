import { getCoords } from './function.js'

import { canvas, ctx } from './canvas.js'
import { buffer, bufferCtx } from './canvas.js'

const controller = new Leap.Controller();
controller.connect();

controller.on('frame', (frame) => {
    leap = frame;
});

export let leap;