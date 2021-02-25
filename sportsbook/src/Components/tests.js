import React from 'react';
import ProjectedLines from './projectedScores';
import ProjectedLinesSOS from './projectedSOSscores';

const Tests = () => {
    let data = require('../odds.json')

    return (
        <div>
            <div className='testsGameBox'>
                {data.map(game => (
                    <div className='gameBox'>
                        <h4>{game.date}</h4>
                        <div className='testsGameInfo'>
                            <div>
                                <h5>Teams</h5>
                                <p>{game.teams.away}</p>
                                <p>{game.teams.home}</p>
                            </div>
                            <div className='rowTitle'>
                                <p>Spread</p>
                                <p className='row'>Moneyline</p>
                                <p className='row'>Total</p>
                            </div>
                            <ProjectedLines
                                away = {game.teams.away}
                                home = {game.teams.home}
                            />
                            <ProjectedLinesSOS
                                away = {game.teams.away}
                                home = {game.teams.home}
                            />                        
                        </div>
                    </div>
                ))}
            </div>
            <div className='testsIframeCont'>
                <iframe 
                    className='testsIframe'
                    src='https://www.ncaa.com/scoreboard/basketball-men/d1'
                />
            </div>
           
        </div>
    )
}

export default Tests