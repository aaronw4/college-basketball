export function winResults(spread1, spread2, score1, score2, projAway, projHome) {    
    let homeAway
    let pick
    let result
    let gameResult

    if (Number(spread1) - Number(projAway) > 4) {
        homeAway = 'Away: '
        pick = spread1
    } else if (-1*Number(spread1) - Number(projHome) > 4) {
        homeAway = 'Home: '
        pick = spread2
    } else {
        homeAway = ''
        pick = 'No bet.'
    }

    if (homeAway === 'Away: ') {
        gameResult = Number(score2) - Number(score1)
    } else if (homeAway === 'Home: ') {
        gameResult = Number(score1) - Number(score2)
    }

    if (pick === 'No bet.') {
        result = ''
    } else if (Number(pick) - Number(gameResult) > 0) {
        result = 'Win'
    } else if (Number(pick) - Number(gameResult) < 0) {
        result = 'Lose'
    } else {
        result = 'Push'
    }

    let resultData = {
        homeAway: homeAway,
        pick: pick,
        result: result
    }

    return (resultData)
}
