import React from 'react';
import {findTeam} from '../Functions/findTeam';
import {projectedScores} from "./projectedScores";
import {projectedSOS} from './projectedSOSscores';
import {winResults} from '../Functions/winResults';
import {sign} from '../Functions/sign';
import {MidPoint} from '../Functions/midpoint';

function Bet(props) {
    let away = findTeam(props.team1)
    let home = findTeam(props.team2)
    let projected = projectedScores(away[0], home[0])
    let projSOS = projectedSOS(away[0], home[0])
    let projectedResults = winResults(
        'projected',
        props.spread1, 
        props.spread2,
        props.score1,
        props.score2,
        props.odds1,
        props.odds2,
        props.openingSpread1,
        props.openingSpread2,
        projected[0].spreadAway,
        projected[0].spreadHome
    )
    let projectedSosResults = winResults(
        'projected',
        props.spread1, 
        props.spread2,
        props.score1,
        props.score2,
        props.odds1,
        props.odds2,
        props.openingSpread1,
        props.openingSpread2,
        projSOS[0].spreadAway,
        projSOS[0].spreadHome
    )
    let midpoint1 = sign(props.openingOdds1, props.openingOdds2) + MidPoint(props.openingOdds1, props.openingOdds2)
    let midpoint2 = sign(props.openingOdds2, props.openingOdds1) + MidPoint(props.openingOdds1, props.openingOdds2)
    let midpointResults = winResults(
        'midpoint',
        props.spread1, 
        props.spread2,
        props.score1,
        props.score2,
        props.odds1,
        props.odds2,
        midpoint1,
        midpoint2,
        props.openingSpread1,
        props.openingSpread2
    )
    let totalPick
    let total = Number(props.score1) + Number(props.score2)
    let projectedTotal = Number(projected[0].total)
    let result

    if (projectedTotal > Number(props.total) + 4) {
        totalPick = 'Over'
    } else if (projectedTotal < Number(props.total) - 4) {
        totalPick = 'Under'
    } else {
        totalPick = 'No Bet'
    }
    console.log(projectedTotal, Number(props.total))
    if (totalPick === 'Over' && total > Number(props.total)) {
        result = 'Win'
    } else if (totalPick === 'Over' && total < Number(props.total)) {
        result = 'Lose'
    } else if (total === projectedTotal) {
        result = 'Push'
    } else if (totalPick === 'Under' && total > Number(props.total)) {
        result = 'Lose'
    } else if (totalPick === 'Under' && total < Number(props.total)) {
        result = 'Win'
    }

    return (
        <div className='betContainer'>
            <div className='fgOpening bet'>
                <h5>Projected Bet</h5>
                <p>{projectedResults.homeAway + projectedResults.pick}</p>
                <p>{projectedResults.result} </p>
                <br/>
                <h5>Projected SOS Bet</h5>
                <p>{projectedSosResults.homeAway + projectedSosResults.pick}</p>
                <p>{projectedSosResults.result}</p>
                <br/>
                <h5>Projected Total Bet</h5>
                <p>{totalPick}</p>
                <p>{result}</p>
            </div>
            <div className='betTotals'>
                <h5>MidPoint Bet</h5>
                <p>{midpointResults.homeAway + midpointResults.pick}</p>
                <p>{midpointResults.result}</p>
            </div>
        </div>
    )
}

export default Bet