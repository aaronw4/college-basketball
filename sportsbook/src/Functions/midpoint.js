export function MidPoint(away, home) {
    let dec1;
    let dec2;
    let ratio;
    let team1 = Number(away);
    let team2 = Number(home);

    if (team1 < 0) {
        dec1 = (100 / (-1 * team1)) + 1;
    } else {
        dec1 = (team1 / 100) + 1;
    };

    if (team2 < 0) {
        dec2 = (100 / (-1 * team2)) + 1;
    } else {
        dec2 = (team2 / 100) + 1;
    };

    let recDec1 = 1 / dec1;
    let recDec2 = 1 / dec2;

    if (recDec1 > recDec2) {
        ratio = recDec1 / (recDec1 + recDec2);
    } else {
        ratio = recDec2 / (recDec1 + recDec2);
    }
    
    let recRatio = (1 / ratio) - 1;
    let mp = (1 / recRatio) * 100;
    return mp.toFixed(1)
}