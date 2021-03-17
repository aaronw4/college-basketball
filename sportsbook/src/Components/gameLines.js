import React from 'react';
import ProjectedLines from './projectedLines';
import ProjectedLinesSOS from './projectedSOSscores';
import FullGameMP from './fullGameMP';
import FirstHalfMP from './firstHalfMP'

const GameLines = () => {
    let data = require('../odds.json')

    return (
        <div>
            {data.map(game => (
                <div className='gameBox'>
                    <h4>{game.date}</h4>
                    <div className='gameInfo'>
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
                            purpose = 'predict'
                        />
                        <ProjectedLinesSOS
                            away = {game.teams.away}
                            home = {game.teams.home}
                        />
                        <div className='fgOpening'>
                            <h5>Full Game Opening</h5>
                            <p>Away: {game.full_game.spread.away_spread}({game.full_game.spread.away_odds})</p>
                            <p>Home: {game.full_game.spread.home_spread}({game.full_game.spread.home_odds})</p>
                            <br/>
                            <p>Away: {game.full_game.moneyline.away}</p>
                            <p>Home: {game.full_game.moneyline.home}</p>
                            <br/>
                            <p>Over {game.full_game.over_under.total}: {game.full_game.over_under.over}</p>
                            <p>Under {game.full_game.over_under.total}: {game.full_game.over_under.under}</p>
                        </div>
                        <FullGameMP
                            game = {game}
                        />
                        <FirstHalfMP
                            game = {game}
                        />
                        {/* <iframe 
                            className='iframe'
                            src={game.graph_address}
                        /> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GameLines