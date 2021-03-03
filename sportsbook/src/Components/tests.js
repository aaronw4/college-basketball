import React from 'react';
import ProjectedLines from './projectedScores';
import ProjectedLinesSOS from './projectedSOSscores';
import Bet from './bet';
import TestCount from './testCount';
import {sign} from '../Functions/sign'
import { MidPoint } from '../Functions/midpoint';

const Tests = () => {
    let data = require('../test.json')
        
    return (
        <div>
            <TestCount/>
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
                                <p>Away: {game.spread1}({game.odds1})</p>
                                <p>Home: {game.spread2}({game.odds2})</p>
                                <br/>
                                <h5>MidPoint</h5>
                                <p>
                                    Away: {game.openingSpread1}
                                    ({sign(game.openingOdds1, game.openingOdds2)}
                                    {MidPoint(game.openingOdds1, game.openingOdds2)})
                                </p>
                                <p>
                                    Home: {game.openingSpread2}
                                    ({sign(game.openingOdds2, game.openingOdds1)}
                                    {MidPoint(game.openingOdds1, game.openingOdds2)})
                                </p>
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
                                odds1 = {game.odds1}
                                odds2 = {game.odds2}
                                openingSpread1 = {game.openingSpread1}
                                openingSpread2 = {game.openingSpread2}
                           />                        
                        </div>
                    </div>
                ))}
            </div>           
        </div>
    )
}

export default Tests