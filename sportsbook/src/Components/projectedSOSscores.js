import React from 'react';
import {findTeam} from '../Functions/findTeam';

export function projectedSOS (away, home){
    // home/away undefined error means findTeam() cant find the team name in stats.json

    let data = require("../stats.json")
    let adjTvalues = data.map(value => Number(value.AdjT))
    let adjTTotal = adjTvalues.reduce((total, amount) => total + amount)
    let adjTAve = adjTTotal / adjTvalues.length
    let possessions = (away.AdjT/adjTAve)*home.AdjT

    let adjOvalues = data.map(value => Number(value.AdjO))
    let adjOtotals = adjOvalues.reduce((total, amount) => total + amount)
    let adjOave = adjOtotals / adjOvalues.length
    let sos = Number(away.SOS) - Number(home.SOS)
    let sosScoreAway
    let sosScoreHome

    if (sos > 0) {
        sosScoreAway = ((Number(away.AdjO) + 2*sos)/adjOave)*home.AdjD*(possessions/100)
        sosScoreHome = (home.AdjO/adjOave)*away.AdjD*(possessions/100)
    } else {
        sosScoreAway = (away.AdjO/adjOave)*home.AdjD*(possessions/100)
        sosScoreHome = ((Number(home.AdjO) - 2*sos)/adjOave)*away.AdjD*(possessions/100)
    }

    let spreadHome = (sosScoreAway - sosScoreHome).toFixed(1)
    let spreadAway = (sosScoreHome - sosScoreAway).toFixed(1)
    let total = (sosScoreAway + sosScoreHome).toFixed(1)

    return ([{
        away: away.name,
        home: home.name,
        scoreAway: sosScoreAway.toFixed(1), 
        scoreHome: sosScoreHome.toFixed(1),
        spreadAway: spreadAway,
        spreadHome: spreadHome,
        total: total
    }])
}

const ProjectedLinesSOS = (props) => {
    let awayStats = findTeam(props.away);
    let homeStats = findTeam(props.home);
    let projectedStats = projectedSOS(awayStats[0], homeStats[0]);
    
    return (
        <div className='fgOpening'>
            <h5>Full Game Projected SOS</h5>
            <p>Away: {projectedStats[0].spreadAway}</p>
            <p>Home: {projectedStats[0].spreadHome}</p>
            <br/>
            <p>Away: {projectedStats[0].scoreAway}</p>
            <p>Home: {projectedStats[0].scoreHome}</p>
            <br/>
            <p>Over {projectedStats[0].total}</p>
            <p>Under {projectedStats[0].total}</p>
        </div>
    )
}

export default ProjectedLinesSOS