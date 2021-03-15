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
    let mpProjAgree = 0
    let mpProjAgreeTotal = 0
    let mpNotProjected = 0
    let mpNotProjectedTotal = 0
    let projSosProjNoBetCount = 0
    let projSosProjNoBetTotal = 0
    let totalProjectedCount2 = 0
    let totalProjectedTotal2 = 0
    let totalProjectedCount4 = 0
    let totalProjectedTotal4 = 0
    
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

        if (projectedResults.result === '' && projectedSosResults.result === 'Win') {
            projSosProjNoBetCount++
            projSosProjNoBetTotal++
        } else if (projectedResults.result === '' && projectedSosResults.result === 'Lose') {
            projSosProjNoBetTotal++
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

        if (midpointResults.result === 'Win' && projectedResults.result === 'Win') {
            mpProjAgree++
            mpProjAgreeTotal++
        } else if (midpointResults.result === 'Lose' && projectedResults.result === 'Lose') {
            mpProjAgreeTotal++
        }

        if (midpointResults.result === "Win" && projectedResults.result === 'Lose') {
            mpNotProjected++
            mpNotProjectedTotal++
        } else if (midpointResults.result === "Lose" && projectedResults.result === 'Win') {
            mpNotProjectedTotal++
        }
        
    let totalPick2
    let totalPick4
    let total = Number(data[i].score1) + Number(data[i].score2)
    let projectedGameTotal = Number(projected[0].total)

    if (projectedGameTotal > Number(data[i].total) + 2) {
        totalPick2 = 'Over'
    } else if (projectedGameTotal < Number(data[i].total) - 2) {
        totalPick2 = 'Under'
    } else {
        totalPick2 = 'No Bet'
    }

    if (projectedGameTotal > Number(data[i].total) + 4) {
        totalPick4 = 'Over'
    } else if (projectedGameTotal < Number(data[i].total) - 4) {
        totalPick4 = 'Under'
    } else {
        totalPick4 = 'No Bet'
    }

    if (totalPick2 === 'Over' && total > Number(data[i].total)) {
        totalProjectedCount2++
        totalProjectedTotal2++
    } else if (totalPick2 === 'Over' && total < Number(data[i].total)) {
        totalProjectedTotal2++
    } else if (totalPick2 === 'Under' && total > Number(data[i].total)) {
        totalProjectedTotal2++
    } else if (totalPick2 === 'Under' && total < Number(data[i].total)) {
        totalProjectedCount2++
        totalProjectedTotal2++
    }

    if (totalPick4 === 'Over' && total > Number(data[i].total)) {
        totalProjectedCount4++
        totalProjectedTotal4++
    } else if (totalPick4 === 'Over' && total < Number(data[i].total)) {
        totalProjectedTotal4++
    } else if (totalPick4 === 'Under' && total > Number(data[i].total)) {
        totalProjectedTotal4++
    } else if (totalPick4 === 'Under' && total < Number(data[i].total)) {
        totalProjectedCount4++
        totalProjectedTotal4++
    }
    }
    
    return (
        <div className='testCount'>
            <div>
                <h3>Projected Wins = {projectedCount}/{projectedTotal} ({(projectedCount/projectedTotal*100).toFixed()}%)</h3>
                <h3>Projected SOS Wins = {projectedSosCount}/{projectedSosTotal} ({(projectedSosCount/projectedSosTotal*100).toFixed()}%)</h3>
                <h3>Proj Total +2 Wins = {totalProjectedCount2}/{totalProjectedTotal2} ({(totalProjectedCount2/totalProjectedTotal2*100).toFixed()}%)</h3>
                <h3>Proj Total +4 Wins = {totalProjectedCount4}/{totalProjectedTotal4} ({(totalProjectedCount4/totalProjectedTotal4*100).toFixed()}%)</h3>
            </div>
            <div>
                <h3>Combined Wins = {combined}/{combinedTotal} ({(combined/combinedTotal*100).toFixed()}%)</h3>
                <h3>Proj Wins when SOS Disagree = {projNotSosCount}/{projNotSosCountTotal} ({(projNotSosCount/projNotSosCountTotal*100).toFixed()}%)</h3>
                <h3>Proj Wins when SOS No Bet = {projSosNoBetCount}/{projSosNoBetCountTotal} ({(projSosNoBetCount/projSosNoBetCountTotal*100).toFixed()}%)</h3>
                <h3>ProjSos Wins when Proj No Bet = {projSosProjNoBetCount}/{projSosProjNoBetTotal}({(projSosProjNoBetCount/projSosProjNoBetTotal*100).toFixed()}%)</h3>
            </div>
            <div>
                <h3>Midpoint Wins = {midpointCount}/{midpointTotal} ({(midpointCount/midpointTotal*100).toFixed()}%)</h3>
                <h3>MP + Projected Agree Wins = {mpProjAgree}/{mpProjAgreeTotal} ({(mpProjAgree/mpProjAgreeTotal*100).toFixed()}%)</h3>
                <h3>MP Wins when Proj Disagree = {mpNotProjected}/{mpNotProjectedTotal} ({(mpNotProjected/mpNotProjectedTotal*100).toFixed()})</h3>
            </div>
        </div>
    )
}

export default TestCount