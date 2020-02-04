frame.hands.forEach((hand) => {
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
    });
})