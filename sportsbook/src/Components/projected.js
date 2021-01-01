export function projected (away, home){
    let pythAway = away.AdjO**10.25 / (away.AdjO**10.25 + away.AdjD**10.25)
    let pythHome = home.AdjO**10.25 / (home.AdjO**10.25 + home.AdjD**10.25)

    let oddsAway = ((pythAway - pythAway*pythHome) / (pythAway + pythHome - 2*pythAway*pythHome))*100
    let oddsHome = ((pythHome - pythAway*pythHome) / (pythAway + pythHome - 2*pythAway*pythHome))*100
    let decAway = ((100 - oddsAway) / oddsAway) + 1
    let decHome = ((100 - oddsHome) / oddsHome) + 1
    let moneylineAway
    let moneylineHome
    if (decAway >= 2) {
        moneylineAway = (decAway - 1) * 100
    } else {
        moneylineAway = -100 / (decAway - 1)
    }
    if (decHome >= 2) {
        moneylineHome = (decHome - 1) * 100
    } else {
        moneylineHome = -100 / (decHome - 1)
    }

    let data = require("../stats.json")
    let adjTvalues = data.map(value => Number(value.AdjT))
    let adjTTotal = adjTvalues.reduce((total, amount) => total + amount)
    let adjTAve = adjTTotal / adjTvalues.length
    let possessions = (away.AdjT/adjTAve)*home.AdjT

    let adjOvalues = data.map(value => Number(value.AdjO))
    let adjOtotals = adjOvalues.reduce((total, amount) => total + amount)
    let adjOave = adjOtotals / adjOvalues.length
    let scoreAway = (away.AdjO/adjOave)*home.AdjD*(possessions/100)
    let scoreHome = (home.AdjO/adjOave)*away.AdjD*(possessions/100)

    let spreadHome = (scoreAway - scoreHome).toFixed(1)
    let spreadAway = (scoreHome - scoreAway).toFixed(1)
    let total = (scoreAway + scoreHome).toFixed(1)

    return ([{
        away: away.name,
        home: home.name,
        moneylineAway: moneylineAway.toFixed(1), 
        moneylineHome: moneylineHome.toFixed(1),
        spreadAway: spreadAway,
        spreadHome: spreadHome,
        total: total
    }])
}

// team1 = { name: 'Wichita St.', AdjO: '105.8', AdjD: '96.4', AdjT: '69.0' }
// team2 = { name: 'South Florida', AdjO: '101.0', AdjD: '93.9', AdjT: '69.6' }
// console.log(projected(team1, team2))