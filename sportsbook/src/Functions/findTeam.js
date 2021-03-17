function findTeam (name, purpose) {
    let stats
    if (purpose === 'test') {
        stats = require('../pastStats.json')
        let adjName = fixPastName(name)
        let teamStats = stats.filter(team => team.name === adjName)
        return teamStats
    } else {
        stats = require('../stats.json')
        let adjName = fixName(name)
        let teamStats = stats.filter(team => team.name === adjName)    
        return teamStats
    }
}

console.log(findTeam("Gonzaga"))

function fixName(name) {
    // remove team ranks
    if (name[0] === '(') {
        let index = name.indexOf(' ')
        name = name.slice(index + 1)
    }

    // change State to St.
    if (name.search('State') !== -1) {
        name = name.replace('State', 'St.')
    }

    // change - to a space
    if (name.search('-') !== -1) {
        name = name.replace('-', ' ')
    }

    // handle individual name differences
    if (name.search('NC Wilmington') !== -1) {
        name = name.replace('NC Wilmington', 'UNC Wilmington')
    }
    if (name.search('Bryant University') !== -1) {
        name = name.replace('Bryant University', 'Bryant')
    }
    if (name.search('Massachusetts Lowell') !== -1) {
        name = name.replace('Massachusetts Lowell', 'UMass Lowell')
    }
    if (name.search("Saint Joseph's") !== -1) {
        name = name.replace("Saint Joseph's (PA)", "Saint Joseph's")
    }
    if (name.search("College of Charleston") !== -1) {
        name = name.replace("College of Charleston", "Charleston")
    }
    if (name.search("Texas Rio Grande Valley") !== -1) {
        name = name.replace("Texas Rio Grande Valley", "UT Rio Grande Valley")
    }
    if (name.search("Arkansas Little Rock") !== -1) {
        name = name.replace("Arkansas Little Rock", "Little Rock")
    }
    if (name.search("Virginia Military") !== -1) {
        name = name.replace("Virginia Military", "VMI")
    }
    if (name.search("Citadel") !== -1) {
        name = name.replace("Citadel", "The Citadel")
    }
    if (name.search("Virginia Commonwealth") !== -1) {
        name = name.replace("Virginia Commonwealth", "VCU")
    }
    if (name.search("Ole Miss") !== -1) {
        name = name.replace("Ole Miss", "Mississippi")
    }
    if (name.search("North Carolina St.") !== -1) {
        name = name.replace("North Carolina St.", "N.C. State")
    }
    if (name.search("Central Connecticut St.") !== -1) {
        name = name.replace("Central Connecticut St.", "Central Connecticut")
    }
    if (name.search("Kansas City") !== -1) {
        name = name.replace("Kansas City", "UMKC")
    }
    if (name.search("St. Peter's") !== -1) {
        name = name.replace("St. Peter's", "Saint Peter's")
    }
    if (name.search("Texas Arlington") !== -1) {
        name = name.replace("Texas Arlington", "UT Arlington")
    }
    if (name.search("Florida International") !== -1) {
        name = name.replace("Florida International", "FIU")
    }
    if (name.search("Louisiana Lafayette") !== -1) {
        name = name.replace("Louisiana Lafayette", "Lafayette")
    }
    if (name.search("Miami (FL)" !== -1)) {
        name = name.replace("Miami (FL)", "Miami FL")
    }
    if (name.search("Miami (OH)" !== -1)) {
        name = name.replace("Miami (OH)", "Miami OH")
    }
    if (name.search("N.J.I.T.") !== -1) {
        name = name.replace("N.J.I.T.", "NJIT")
    }
    if (name.search("Southern University" !== -1)) {
        name = name.replace("Southern University", "Southern")
    }
    if (name.search("California Baptist" !== -1)) {
        name = name.replace("California Baptist", "Cal Baptist")
    }
    if (name.search("Texas A&M CC" !== -1)) {
        name = name.replace("Texas A&M CC", "Texas A&M Corpus Chris")
    }
    if (name.search("St. Francis (PA)" !== -1)) {
        name = name.replace("St. Francis (PA)", "St. Francis PA")
    }
    if (name.search("Detroit Mercy" !== -1)) {
        name = name.replace("Detroit Mercy", "Detroit")
    }
    if (name.search("American University" !== -1)) {
        name = name.replace("American University", "American")
    }
    if (name.search("Loyola (MD)" !== -1)) {
        name = name.replace("Loyola (MD)", "Loyola MD")
    }
    if (name.search("St. Francis (BKN)" !== -1)) {
        name = name.replace("St. Francis (BKN)", "St. Francis NY")
    }

    return name
}

function fixPastName(name) {  
    if (name.search('State') !== -1) {
        name = name.replace('State', 'St')
    }
    if (name.search("Eastern") !== -1) {
        name = name.replace("Eastern", "E")
    }
    if (name.search("Northern") !== -1) {
        name = name.replace("Northern", "N")
    }
    if (name.search("Gardner-Webb") !== -1) {
        name = name.replace("Gardner-Webb", "Gard-Webb")
    }
    if (name.search("Tennessee-Martin") !== -1) {
        name = name.replace("Tennessee-Martin", "TN Martin")
    }
    if (name.search("Fairleigh Dickinson") !== -1) {
        name = name.replace("Fairleigh Dickinson", "F Dickinson")
    }
    if (name.search("Georgia Southern") !== -1) {
        name = name.replace("Georgia Southern", "GA Southern")
    }
    if (name.search("Charleston Southern") !== -1) {
        name = name.replace("Charleston Southern", "Charl South")
    }
    if (name.search("South Alabama") !== -1) {
        name = name.replace("South Alabama", "S Alabama")
    }
    if (name.search("USC Upstate") !== -1) {
        name = name.replace("USC Upstate", "SC Upstate")
    }
    if (name.search("Texas-Arlington") !== -1) {
        name = name.replace("Texas-Arlington", "TX-Arlington")
    }
    if (name.search("Mount St. Mary's") !== -1) {
        name = name.replace("Mount St. Mary's", "St Marys")
    }
    if (name.search("St. Francis (BKN)" !== -1)) {
        name = name.replace("St. Francis (BKN)", "St Fran (NY)")
    }
    if (name.search("St. Francis (PA)" !== -1)) {
        name = name.replace("St. Francis (PA)", "St Fran (PA)")
    }
    if (name.search("Central Connecticut St") !== -1) {
        name = name.replace("Central Connecticut St", "Central Conn")
    }
    if (name.search("Louisiana-Monroe") !== -1) {
        name = name.replace("Louisiana-Monroe", "LA Monroe")
    }
    if (name.search("Louisiana-Lafayette") !== -1) {
        name = name.replace("Louisiana-Lafayette", "LA Lafayette")
    }
    if (name.search("Iowa St") !== -1) {
        name = name.replace("Iowa St", "Iowa State")
    }
    if (name.search("Weber St") !== -1) {
        name = name.replace("Weber St", "Weber State")
    }
    if (name.search("Texas St") !== -1) {
        name = name.replace("Texas St", "Texas State")
    }
    if (name.search("Idaho St") !== -1) {
        name = name.replace("Idaho St", "Idaho State")
    }
    if (name.search("Boise St") !== -1) {
        name = name.replace("Boise St", "Boise State")
    }
    if (name.search("Jacksonville St") !== -1) {
        name = name.replace("Jacksonville St", "Jackson St")
    }
    if (name.search("Appalachian St") !== -1) {
        name = name.replace("Appalachian St", "App State")
    }
    if (name.search("Washington St") !== -1) {
        name = name.replace("Washington St", "Wash State")
    }
    if (name.search("Sacramento St") !== -1) {
        name = name.replace("Sacramento St", "Sac State")
    }
    if (name.search("Tennessee St") !== -1) {
        name = name.replace("Tennessee St", "TN State")
    }
    if (name.search("Tennessee Tech") !== -1) {
        name = name.replace("Tennessee Tech", "TN Tech")
    }
    if (name.search("E Washington") !== -1) {
        name = name.replace("E Washington", "E Washingtn")
    }
    if (name.search("SIU-Edwardsville") !== -1) {
        name = name.replace("SIU-Edwardsville", "SIU Edward")
    }
    if (name.search("East Carolina") !== -1) {
        name = name.replace("East Carolina", "E Carolina")
    }
    if (name.search("Coastal Carolina") !== -1) {
        name = name.replace("Coastal Carolina", "Coastal Car")
    }

    return name
}

function noMatch () {
    let odds = require('../odds.json')
    let oddsPast = require('../test.json')
    let stats = require('../stats.json')
    let pastStats = require('../pastStats.json')
    let oddsNames = []
    let oddsNamesPast = []
    let missingNames = []
    let missingNamesPast = []

    for (let i = 0; i < odds.length; i++) {
        let away = fixName(odds[i].teams.away)
        let home = fixName(odds[i].teams.home)
        oddsNames.push(away)
        oddsNames.push(home)
    }

    for (let i = 0; i < oddsPast.length; i++) {
        let awayPast = fixPastName(oddsPast[i].team1)
        let homePast = fixPastName(oddsPast[i].team2)
        oddsNamesPast.push(awayPast)
        oddsNamesPast.push(homePast)
    }

    for (let i = 0; i < oddsNames.length; i++) {
        let match = false

        for (let j = 0; j < stats.length; j++) {            
            if (oddsNames[i] === stats[j].name) {
                match = true
            }
        }
        if (match === false) {
            missingNames.push(oddsNames[i])
        }
    }

    for (let i = 0; i <oddsNamesPast.length; i++) {
        let match = false
        for (let j = 0; j < pastStats.length; j++) {
            if (oddsNamesPast[i] === pastStats[j].name) {
                match = true
            }
        }
        if (match === false) {
            missingNamesPast.push(oddsNamesPast[i])
        }
    }
    console.log('past', missingNamesPast)
    return missingNames
}

console.log(noMatch())