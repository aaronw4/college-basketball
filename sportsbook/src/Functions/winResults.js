export function winResults(type, spread1, spread2, score1, score2, odds1, odds2, openingOdds1, openingOdds2, projAway, projHome) {    
    let homeAway
    let pick
    let result
    let gameResult

    if (spread1 === '') {
        homeAway = ''
        pick = 'No bet.'
    } else if (Number(spread1) - Number(projAway) > 3) {
        homeAway = 'Away: '
        pick = spread1
    } else if (-1*Number(spread1) - Number(projHome) > 3) {
        homeAway = 'Home: '
        pick = spread2
    } else if (type === 'midpoint' && spread1 === projAway) {
        if (Number(odds1) - Number(openingOdds1) > 2) {
            homeAway = 'Away: '
            pick = odds1
        } else if (Number(odds2) - Number(openingOdds2) > 2) {
            homeAway = 'Home: '
            pick = spread2
        } else {
            homeAway = ''
            pick = "No bet."
        }
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
    } else if (pick === null) {
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
