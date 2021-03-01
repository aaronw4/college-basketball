import React from 'react';
import ProjectedLines from './projectedScores';
import ProjectedLinesSOS from './projectedSOSscores';
import Bet from './bet';
import {findTeam} from '../Functions/findTeam';
import {projectedScores} from "./projectedScores";
import {projectedSOS} from './projectedSOSscores';
import {winResults} from '../Functions/winResults';

const Tests = () => {
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
    
    for (let i=0; i < data.length; i++) {
        let away = findTeam(data[i].team1)
        let home = findTeam(data[i].team2)
        let projected = projectedScores(away[0], home[0])
        let projectedResults = winResults(
            data[i].spread1, 
            data[i].spread2,
            data[i].score1,
            data[i].score2,
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
            data[i].spread1, 
            data[i].spread2,
            data[i].score1,
            data[i].score2,
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
    }
    
    return (
        <div>
            <h3>Projected Wins = {projectedCount}/{projectedTotal} ({(projectedCount/projectedTotal*100).toFixed()}%)</h3>
            <h3>Projected SOS Wins = {projectedSosCount}/{projectedSosTotal} ({(projectedSosCount/projectedSosTotal*100).toFixed()}%)</h3>
            <h3>Combined Wins = {combined}/{combinedTotal} ({(combined/combinedTotal*100).toFixed()}%)</h3>
            <h3>Proj not SOS Wins = {projNotSosCount}/{projNotSosCountTotal} ({(projNotSosCount/projNotSosCountTotal*100).toFixed()}%)</h3>
            <h3>Proj, SOS No Bet, Wins = {projSosNoBetCount}/{projSosNoBetCountTotal} ({(projSosNoBetCount/projSosNoBetCountTotal*100).toFixed()}%)</h3>
            <div className='testsGameBox'>
                {data.map(game => (
                    <div className='gameBox'>
                        <h4>{game.date}</h4>
                        <div className='testsGameInfo'>
                            <div>
                                <h5>Teams</h5>
                                <p>{game.team1}</p>
                                <p>{game.team2}</p>
                            </div>
                            <div className='fgOpening'>
                                <h5>Actual Line</h5>
                                <p>Away: {game.spread1}</p>
                                <p>Home: {game.spread2}</p>
                            </div>
                            <ProjectedLines
                                away = {game.team1}
                                home = {game.team2}
                            />
                            <ProjectedLinesSOS
                                away = {game.team1}
                                home = {game.team2}
                            />                        
                            <div className='fgOpening'>
                                <h5>Results</h5>
                                <p>Away: {Number(game.score2) - Number(game.score1)}</p>
                                <p>Home: {Number(game.score1) - Number(game.score2)}</p>
                                <br/>
                                <p>Away: {game.score1}</p>
                                <p>Home: {game.score2}</p>
                            </div>  
                           <Bet 
                                team1 = {game.team1}
                                team2 = {game.team2}
                                spread1 = {game.spread1}
                                spread2 = {game.spread2}
                                score1 = {game.score1}
                                score2 = {game.score2}
                           />                        
                        </div>
                    </div>
                ))}
            </div>           
        </div>
    )
}

export default Tests