function fixPastName(name) {  
    if (name.search('State') !== -1) {
        name = name.replace('State', 'St')
    }
    if (name.search("Eastern") !== -1) {
        name = name.replace("Eastern", "E")
    }
    if (name.search("Western") !== -1) {
        name = name.replace("Western", "W")
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
    if (name.search('Massachusetts-Lowell') !== -1) {
        name = name.replace('Massachusetts-Lowell', 'Mass Lowell')
    }
    if (name.search('New Hampshire') !== -1) {
        name = name.replace('New Hampshire', 'N Hampshire')
    }
    if (name.search('South Carolina St') !== -1) {
        name = name.replace('South Carolina St', 'S Car State')
    }
    if (name.search('Boston University') !== -1) {
        name = name.replace('Boston University', 'Boston U')
    }
    if (name.search('UTEP') !== -1) {
        name = name.replace('UTEP', 'TX El Paso')
    }
    if (name.search('Florida International') !== -1) {
        name = name.replace('Florida International', 'Florida Intl')
    }
    if (name.search('South Florida') !== -1) {
        name = name.replace('South Florida', 'S Florida')
    }
    if (name.search('Loyola (MD)') !== -1) {
        name = name.replace('Loyola (MD)', 'Loyola-MD')
    }

    return name
}

function noMatch () {
    let oddsPast = require('../test.json')
    let pastStats = require('../pastStats.json')
    let oddsNamesPast = []
    let missingNamesPast = []

    for (let i = 0; i < oddsPast.length; i++) {
        let awayPast = fixPastName(oddsPast[i].team1)
        let homePast = fixPastName(oddsPast[i].team2)
        oddsNamesPast.push(awayPast)
        oddsNamesPast.push(homePast)
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
    
    return missingNamesPast
}

console.log(noMatch())