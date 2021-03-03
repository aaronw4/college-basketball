import React from 'react';
import {findTeam} from '../Functions/findTeam';
import {projectedScores} from "./projectedScores";
import {projectedSOS} from './projectedSOSscores';
import {winResults} from '../Functions/winResults';
import {sign} from '../Functions/sign';
import {MidPoint} from '../Functions/midpoint';

const TestCount = () => {
    let data = require('../test.json')
    let projectedCount = 0
    let projectedTotal = 0
    let projectedSosCount = 0
    let projectedSosTotal = 0
    let combined = 0
    let combinedTotal = 0
    let projNotSosCount = 0
    let projNotSosCountTotal = 0
    let projSosNoBetCount = 0
    let projSosNoBetCountTotal = 0
    let midpointCount = 0
    let midpointTotal = 0
    
    for (let i=0; i < data.length; i++) {
        let away = findTeam(data[i].team1)
        let home = findTeam(data[i].team2)
        let projected = projectedScores(away[0], home[0])
        let projectedResults = winResults(
            'projected',
            data[i].spread1, 
            data[i].spread2,
            data[i].score1,
            data[i].score2,
            data[i].odds1,
            data[i].odds2,
            data[i].openingSpread1,
            data[i].openingSpread2,
            projected[0].spreadAway,
            projected[0].spreadHome
        )
        
        if (projectedResults.result === "Win") {
            projectedCount++
            projectedTotal++
        } else if (projectedResults.result === 'Lose') {
            projectedTotal++
        }
    
        let projSOS = projectedSOS(away[0], home[0])
        let projectedSosResults = winResults(
            'projected',
            data[i].spread1, 
            data[i].spread2,
            data[i].score1,
            data[i].score2,
            data[i].odds1,
            data[i].odds2,
            data[i].openingSpread1,
            data[i].openingSpread2,
            projSOS[0].spreadAway,
            projSOS[0].spreadHome
        )
        if (projectedSosResults.result === 'Win') {
            projectedSosCount++
            projectedSosTotal++
        } else if (projectedSosResults.result === 'Lose') {
            projectedSosTotal++
        }

        if (projectedResults.result === "Win" && projectedSosResults.result === 'Win') {
            combined++
            combinedTotal++
        } else if (projectedResults.result === "Lose" && projectedSosResults.result === 'Lose') {
            combinedTotal++
        }

        if (projectedResults.result === 'Win' && projectedSosResults.result === 'Lose') {
            projNotSosCount++
            projNotSosCountTotal++
        } else if (projectedResults.result === 'Lose' && projectedSosResults.result === 'Win') {
            projNotSosCountTotal++
        }

        if (projectedResults.result === 'Win' && projectedSosResults.result === '') {
            projSosNoBetCount++
            projSosNoBetCountTotal++
        } else if (projectedResults.result === 'Lose' && projectedSosResults.result === '') {
            projSosNoBetCountTotal++
        }

        let midpoint1 = sign(data[i].openingOdds1, data[i].openingOdds2) + MidPoint(data[i].openingOdds1, data[i].openingOdds2)
        let midpoint2 = sign(data[i].openingOdds2, data[i].openingOdds1) + MidPoint(data[i].openingOdds1, data[i].openingOdds2)
    
        let midpointResults = winResults(
            'midpoint',
            data[i].spread1, 
            data[i].spread2,
            data[i].score1,
            data[i].score2,
            data[i].odds1,
            data[i].odds2,
            midpoint1,
            midpoint2,
            data[i].openingSpread1,
            data[i].openingSpread2
        )
        
        if (midpointResults.result === 'Win') {
            midpointCount++
            midpointTotal++
        } else if (midpointResults.result === 'Lose') {
            midpointTotal++
        }
    }
    
    return (
        <div className='testCount'>
            <div>
                <h3>Projected Wins = {projectedCount}/{projectedTotal} ({(projectedCount/projectedTotal*100).toFixed()}%)</h3>
                <h3>Projected SOS Wins = {projectedSosCount}/{projectedSosTotal} ({(projectedSosCount/projectedSosTotal*100).toFixed()}%)</h3>
            </div>
            <div>
                <h3>Combined Wins = {combined}/{combinedTotal} ({(combined/combinedTotal*100).toFixed()}%)</h3>
                <h3>Proj not SOS Wins = {projNotSosCount}/{projNotSosCountTotal} ({(projNotSosCount/projNotSosCountTotal*100).toFixed()}%)</h3>
                <h3>Proj, SOS No Bet, Wins = {projSosNoBetCount}/{projSosNoBetCountTotal} ({(projSosNoBetCount/projSosNoBetCountTotal*100).toFixed()}%)</h3>
            </div>
            <div>
                <h3>Midpoint Wins = {midpointCount}/{midpointTotal} ({(midpointCount/midpointTotal*100).toFixed()}%)</h3>
            </div>
        </div>
    )
}

export default TestCount