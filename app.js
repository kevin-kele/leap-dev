export function getCoords(leapPoint, frame, canvas) {
    const [x, y] = frame.interactionBox.normalizePoint(leapPoint);

    return {
        x: canvas.width * x,
        y: canvas.height * (1 - y),
    };
}