import React from 'react';
import {findTeam} from '../Functions/findTeam';

export function projectedScores (away, home){
    // home/away undefined error means findTeam() cant find the team name in stats.json

    let data = require("../pastStats.json")
    let adjTvalues = data.map(value => Number(value.AdjT))
    let adjTTotal = adjTvalues.reduce((total, amount) => total + amount)
    let adjTAve = adjTTotal / adjTvalues.length
    let possessions = (away.AdjT/adjTAve)*home.AdjT

    let adjOvalues = data.map(value => Number(value.AdjO))
    let adjOtotals = adjOvalues.reduce((total, amount) => total + amount)
    let adjOave = adjOtotals / adjOvalues.length
    let scoreAway = (away.AdjO/adjOave)*home.AdjD*(possessions/100)
    let scoreHome = (home.AdjO/adjOave)*away.AdjD*(possessions/100)
    console.log(adjTAve, adjOave)

    let spreadHome = (scoreAway - scoreHome).toFixed(1)
    let spreadAway = (scoreHome - scoreAway).toFixed(1)
    let total = (scoreAway + scoreHome).toFixed(1)

    return ([{
        away: away.name,
        home: home.name,
        scoreAway: scoreAway.toFixed(1), 
        scoreHome: scoreHome.toFixed(1),
        spreadAway: spreadAway,
        spreadHome: spreadHome,
        total: total
    }])
}

const ProjectedLines = (props) => {
    let awayStats = findTeam(props.away, props.purpose);
    let homeStats = findTeam(props.home, props.purpose);
    let projectedStats = projectedScores(awayStats[0], homeStats[0]);
    
    return (
        <div className='fgOpening'>
            <h5>Full Game Projected</h5>
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

export default ProjectedLines