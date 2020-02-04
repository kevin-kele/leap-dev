import { getCoords } from './app.js'

import { canvas, ctx } from './canvas.js'



// Leap hover
class LeapHover {
    constructor() {
        this.leapHoverElements = [];
        document.querySelectorAll('[leap-hover]').forEach(element => {
            this.leapHoverElements.push(element);
        });
    }

    verify(x, y, callback) {
        this.leapHoverElements.forEach(element => {
            let rect = element.getBoundingClientRect();
            element.classList.remove('leap-hover');
            if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                element.classList.add('leap-hover');
                // document.elementFromPoint(x, y).click();
                callback(element);
            }
        });
    }
}
const leapHover = new LeapHover();

const controller = new Leap.Controller();
controller.connect();
controller.on('frame', frame => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frame.hands.forEach(hand => {
        let { x, y } = getCoords(hand.stabilizedPalmPosition, frame, canvas);

        leapHover.verify(x, y, function(el) {
            if (hand.pinchStrength >= 0.95) {
                el.classList.remove('tile-active');

                setTimeout(() => el.classList.add('tile-active'), 0);
            }
        });

        if (hand.pinchStrength >= 0.95) {
            ctx.fillStyle = '#f00';
        } else {
            ctx.fillStyle = '#000';
        }

        ctx.fillRect(x, y, 10, 10);
        // Dessin de la paume
        const palmPos = getCoords(hand.palmPosition, frame, canvas);
        ctx.fillRect(palmPos.x, palmPos.y, 25, 25);

        //dessin de poignet
        ctx.fillStyle = 'black';
        let nextJoint = getCoords(hand.arm.nextJoint, frame, canvas);
        ctx.fillRect(nextJoint.x, nextJoint.y, 25, 25);

        // Dessin des doigts
        const carps = [];
        const mcps = [];
        hand.fingers.forEach((finger) => {
            // Pour chaque doigt, dessin des différentes phalanges …
            const tip = getCoords(finger.tipPosition, frame, canvas);
            const dip = getCoords(finger.dipPosition, frame, canvas);
            const pip = getCoords(finger.pipPosition, frame, canvas);
            const mcp = getCoords(finger.mcpPosition, frame, canvas);
            const carp = getCoords(finger.carpPosition, frame, canvas);

            ctx.fillStyle = 'red';
            const pos = [tip, dip, pip, mcp, carp, ]
            for (let i = 0; i < pos.length - 1; i++) {
                ctx.fillRect(pos[i].x, pos[i].y, 10, 10);
                ctx.beginPath();
                ctx.moveTo(pos[i].x, pos[i].y);
                ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(pos[i].x, pos[i].y);
                ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
                ctx.stroke();
                ctx.closePath();
            }
            ctx.fillRect(carp.x, carp.y, 10, 10);

            carps.push(carp);
            mcps.push(mcp);
        })
    });

});


export let leap;