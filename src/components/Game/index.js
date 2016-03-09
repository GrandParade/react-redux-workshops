import React, { PropTypes } from 'react';

import Statistics from '../Statistics';

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

                <Statistics
                    options={[
                        { id: 'goal', name: 'Goals', home: 1, away: 3 },
                        { id: 'dangerous attack', name: 'Dangerous attacks', home: 5, away: 3 },
                        { id: 'shot on target', name: 'Shot on target', home: 1, away: 2 },
                        { id: 'corner', name: 'Corners', home: 0, away: 0 }
                    ]}
                />
            </div>
        );
    }
}

export default Game;
