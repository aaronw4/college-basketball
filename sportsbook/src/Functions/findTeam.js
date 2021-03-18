import {fixName} from './fixName'
import {fixPastName} from './fixPastName'

export function findTeam (name, purpose) {
    let stats
    if (purpose === 'test') {
        stats = require('../pastStats.json')
        let adjName = fixPastName(name)
        let teamStats = stats.filter(team => team.name === adjName)
        return teamStats
    } else if (purpose === 'predict') {
        stats = require('../stats.json')
        let adjName = fixName(name)
        let teamStats = stats.filter(team => team.name === adjName)    
        return teamStats
    }
}

console.log(findTeam("Gonzaga"))