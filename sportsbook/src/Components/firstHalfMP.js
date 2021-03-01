import React from 'react';
import {MidPoint} from '../Functions/midpoint';
import {sign} from '../Functions/sign';

const FirstHalfMP = (props) => {
    return (
        <div className='fhMidpoints'>
            <h5>First Half Midpoints</h5>
            <p>
                Away: {props.game.first_half.spread.away_spread}
                ({sign(props.game.first_half.spread.away_odds, props.game.first_half.spread.home_odds)}
                {MidPoint(props.game.first_half.spread.away_odds, props.game.first_half.spread.home_odds)})
            </p>
            <p>
                Home: {props.game.first_half.spread.home_spread}
                ({sign(props.game.first_half.spread.home_odds, props.game.first_half.spread.away_odds)}
                {MidPoint(props.game.first_half.spread.away_odds, props.game.first_half.spread.home_odds)})</p>
            <br/>
            <p>
                Away: {sign(props.game.first_half.moneyline.away, props.game.first_half.moneyline.home)}
                {MidPoint(props.game.first_half.moneyline.away, props.game.first_half.moneyline.home)}</p>
            <p>
                Home: {sign(props.game.first_half.moneyline.home, props.game.first_half.moneyline.away)}
                {MidPoint(props.game.first_half.moneyline.away, props.game.first_half.moneyline.home)}</p>
            <br/>
            <p>
                Over {props.game.first_half.over_under.total}: {sign(props.game.first_half.over_under.over, props.game.first_half.over_under.under)}
                {MidPoint(props.game.first_half.over_under.over, props.game.first_half.over_under.under)}
            </p>
            <p>
                Under {props.game.first_half.over_under.total}: {sign(props.game.first_half.over_under.under, props.game.first_half.over_under.over)}
                {MidPoint(props.game.first_half.over_under.over, props.game.first_half.over_under.under)}
            </p>
        </div>
    )
}

export default FirstHalfMP