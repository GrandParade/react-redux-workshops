import React, { PropTypes } from 'react';

import { time as formatTime } from '../../utils/format';

import './Game.scss';

class Game extends React.Component {
    static propTypes = {
        home: PropTypes.string,
        away: PropTypes.string,
        playtime: PropTypes.number
    };

    static defaultProps = {
        home: 'Team 1',
        away: 'Team 2',
        playtime: 0
    };

    render() {
        const { home, away, playtime } = this.props;

        return (
            <div className="game">
                <header>
                    <span className="game__team game__team--home">{ home }</span>
                    <span className="game__timer">{ formatTime(playtime) }</span>
                    <span className="game__team game__team--away">{ away }</span>
                </header>
            </div>
        );
    }
}

export default Game;
