function padd(val) {
    return val > 99 ? val : ('00' + val).substr(-2);
}

export function time(playtime) {
    playtime = Math.round(playtime / 1000);

    let minutes = Math.floor(playtime / 60);
    let seconds = playtime % 60;

    return padd(minutes) + ':' + padd(seconds);
}
