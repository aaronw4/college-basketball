import React from 'react';
import {findTeam} from '../Functions/findTeam';
import {projected} from '../Functions/projected';

const ProjectedLines = (props) => {
    let awayStats = findTeam(props.away);
    let homeStats = findTeam(props.home);
    let projectedStats = projected(awayStats[0], homeStats[0]);
    
    return (
        <div className='fgOpening'>
            <h5>Full Game Projected</h5>
            <p>Away: {projectedStats[0].spreadAway}</p>
            <p>Home: {projectedStats[0].spreadHome}</p>
            <br/>
            <p>Away: {projectedStats[0].moneylineAway}</p>
            <p>Home: {projectedStats[0].moneylineHome}</p>
            <br/>
            <p>Over {projectedStats[0].total}</p>
            <p>Under {projectedStats[0].total}</p>
        </div>
    )
}

export default ProjectedLines