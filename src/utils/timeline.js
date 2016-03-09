export function calculateBoxPoints(width, height) {
    return '0 0 ' + width + ' 0 ' + width + ' ' + height + ' 0 ' + height;
}

export function calculateMomentumPoints(incidents, playtime, width, heightPerSecond) {
    let points = [
        width + ' 0',
        (width / 2) + ' 0'
    ];

    let momentum = incidents.length ? 1 - incidents[incidents.length - 1].momentum : 0.5;

    incidents.forEach(incident => {
        let x = (1 - incident.momentum) * width;
        let y = heightPerSecond * incident.playtime / 1000;

        points.push(x + ' ' + y);

        if (incident.playtime > playtime) {
            playtime = incident.playtime;
        }
    });

    points.push(momentum * width + ' ' + heightPerSecond * playtime / 1000);
    points.push(width + ' ' + heightPerSecond * playtime / 1000);

    return points.join(' ');
}

export function calculatePoint(incident, width, heightPerSecond) {
    return {
        cx: (1 - incident.momentum) * width,
        cy: heightPerSecond * incident.playtime / 1000
    };
}
