import React from 'react';
import {MidPoint} from './midpoint';
import ProjectedLines from './projectedLines';

const GameLines = () => {
    let data = require('../odds.json')

    function sign(value, otherValue) {
        if (Number(value) < Number(otherValue)) {
            return('-')
        } else {
            return('+')
        }
    }

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
                        />
                        <div className='fgMidpoint'>
                            <h5>Full Game Midpoints</h5>
                            <p>
                                Away: {game.full_game.spread.away_spread}
                                ({sign(game.full_game.spread.away_odds, game.full_game.spread.home_odds)}
                                {MidPoint(game.full_game.spread.away_odds, game.full_game.spread.home_odds)})
                            </p>
                            <p>
                                Home: {game.full_game.spread.home_spread}
                                ({sign(game.full_game.spread.home_odds, game.full_game.spread.away_odds)}
                                {MidPoint(game.full_game.spread.away_odds, game.full_game.spread.home_odds)})</p>
                            <br/>
                            <p>
                                Away: {sign(game.full_game.moneyline.away, game.full_game.moneyline.home)}
                                {MidPoint(game.full_game.moneyline.away, game.full_game.moneyline.home)}</p>
                            <p>
                                Home: {sign(game.full_game.moneyline.home, game.full_game.moneyline.away)}
                                {MidPoint(game.full_game.moneyline.away, game.full_game.moneyline.home)}</p>
                            <br/>
                            <p>
                                Over {game.full_game.over_under.total}: {sign(game.full_game.over_under.over, game.full_game.over_under.under)}
                                {MidPoint(game.full_game.over_under.over, game.full_game.over_under.under)}
                            </p>
                            <p>
                                Under {game.full_game.over_under.total}: {sign(game.full_game.over_under.under, game.full_game.over_under.over)}
                                {MidPoint(game.full_game.over_under.over, game.full_game.over_under.under)}
                            </p>
                        </div>
                        <div className='fhMidpoints'>
                            <h5>First Half Midpoints</h5>
                            <p>
                                Away: {game.first_half.spread.away_spread}
                                ({sign(game.first_half.spread.away_odds, game.first_half.spread.home_odds)}
                                {MidPoint(game.first_half.spread.away_odds, game.first_half.spread.home_odds)})
                            </p>
                            <p>
                                Home: {game.first_half.spread.home_spread}
                                ({sign(game.first_half.spread.home_odds, game.first_half.spread.away_odds)}
                                {MidPoint(game.first_half.spread.away_odds, game.first_half.spread.home_odds)})</p>
                            <br/>
                            <p>
                                Away: {sign(game.first_half.moneyline.away, game.first_half.moneyline.home)}
                                {MidPoint(game.first_half.moneyline.away, game.first_half.moneyline.home)}</p>
                            <p>
                                Home: {sign(game.first_half.moneyline.home, game.first_half.moneyline.away)}
                                {MidPoint(game.first_half.moneyline.away, game.first_half.moneyline.home)}</p>
                            <br/>
                            <p>
                                Over {game.first_half.over_under.total}: {sign(game.first_half.over_under.over, game.first_half.over_under.under)}
                                {MidPoint(game.first_half.over_under.over, game.first_half.over_under.under)}
                            </p>
                            <p>
                                Under {game.first_half.over_under.total}: {sign(game.first_half.over_under.under, game.first_half.over_under.over)}
                                {MidPoint(game.first_half.over_under.over, game.first_half.over_under.under)}
                            </p>
                        </div>
                        <iframe 
                            className='iframe'
                            src={game.graph_address}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GameLines