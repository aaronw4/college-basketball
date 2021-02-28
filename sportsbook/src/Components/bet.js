import React from 'react';
import {findTeam} from '../Functions/findTeam';
import {projectedScores} from "./projectedScores";
import {projectedSOS} from './projectedSOSscores';
import {winResults} from '../Functions/winResults';

function Bet(props) {
    let away = findTeam(props.team1)
    let home = findTeam(props.team2)
    let projected = projectedScores(away[0], home[0])
    let projSOS = projectedSOS(away[0], home[0])
    let projectedResults = winResults(
        props.spread1, 
        props.spread2,
        props.score1,
        props.score2,
        projected[0].spreadAway,
        projected[0].spreadHome
    )
    let projectedSosResults = winResults(
        props.spread1, 
        props.spread2,
        props.score1,
        props.score2,
        projSOS[0].spreadAway,
        projSOS[0].spreadHome
    )

    return (
        <div className='fgOpening bet'>
            <h5>Projected Bet</h5>
            <p>{projectedResults.homeAway + projectedResults.pick}</p>
            <p>{projectedResults.result} </p>
            <br/>
            <h5>Projected SOS Bet</h5>
            <p>{projectedSosResults.homeAway + projectedSosResults.pick}</p>
            <p>{projectedSosResults.result}</p>
        </div>
    )
}

export default Bet