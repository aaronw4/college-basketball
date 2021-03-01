import React from 'react';
import {MidPoint} from '../Functions/midpoint';
import {sign} from '../Functions/sign';

const FullGameMP = (props) => {
    return (
        <div className='fgMidpoint'>
            <h5>Full Game Midpoints</h5>
            <p>
                Away: {props.game.full_game.spread.away_spread}
                ({sign(props.game.full_game.spread.away_odds, props.game.full_game.spread.home_odds)}
                {MidPoint(props.game.full_game.spread.away_odds, props.game.full_game.spread.home_odds)})
            </p>
            <p>
                Home: {props.game.full_game.spread.home_spread}
                ({sign(props.game.full_game.spread.home_odds, props.game.full_game.spread.away_odds)}
                {MidPoint(props.game.full_game.spread.away_odds, props.game.full_game.spread.home_odds)})</p>
            <br/>
            <p>
                Away: {sign(props.game.full_game.moneyline.away, props.game.full_game.moneyline.home)}
                {MidPoint(props.game.full_game.moneyline.away, props.game.full_game.moneyline.home)}</p>
            <p>
                Home: {sign(props.game.full_game.moneyline.home, props.game.full_game.moneyline.away)}
                {MidPoint(props.game.full_game.moneyline.away, props.game.full_game.moneyline.home)}</p>
            <br/>
            <p>
                Over {props.game.full_game.over_under.total}: {sign(props.game.full_game.over_under.over, props.game.full_game.over_under.under)}
                {MidPoint(props.game.full_game.over_under.over, props.game.full_game.over_under.under)}
            </p>
            <p>
                Under {props.game.full_game.over_under.total}: {sign(props.game.full_game.over_under.under, props.game.full_game.over_under.over)}
                {MidPoint(props.game.full_game.over_under.over, props.game.full_game.over_under.under)}
            </p>
        </div>
    )
}

export default FullGameMP