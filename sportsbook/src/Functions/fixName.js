export function fixName(name) {
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


function noMatch () {
    let odds = require('../odds.json')
    let stats = require('../stats.json')
    let oddsNames = []
    let missingNames = []

    for (let i = 0; i < odds.length; i++) {
        let away = fixName(odds[i].teams.away)
        let home = fixName(odds[i].teams.home)
        oddsNames.push(away)
        oddsNames.push(home)
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

    return missingNames
}

console.log(noMatch())