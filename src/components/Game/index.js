import React, { PropTypes } from 'react';

import Statistics from '../Statistics';
import Timeline from '../Timeline';

import { time as formatTime } from '../../utils/format';

import './Game.scss';

const VISIBLE_STATISTICS = [
    { id: 'goal', name: 'Goals' },
    { id: 'dangerous attack', name: 'Dangerous attacks' },
    { id: 'shot on target', name: 'Shots on target' },
    { id: 'corner', name: 'Corners' }
];

class Game extends React.Component {
    static propTypes = {
        home: PropTypes.string,
        away: PropTypes.string,
        playtime: PropTypes.number,
        incidents: PropTypes.arrayOf(PropTypes.object),
        stopped: PropTypes.bool
    };

    static defaultProps = {
        home: 'Team 1',
        away: 'Team 2',
        playtime: 0,
        incidents: [],
        stopped: false
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            playtimeUpdatedAt: Date.now(),
            playtime: props.playtime
        };
    }

    componentDidMount() {
        this.startTimer(this.props.playtime);
    }

    componentWillReceiveProps(props) {
        if (this.interval && props.playtime !== this.props.playtime) {
            this.startTimer(props.playtime);
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer(time) {
        this.stopTimer();

        this.setState({
            playtime: time,
            playtimeUpdatedAt: Date.now()
        });

        this.interval = setInterval(() => {
            const { stopped, playtime } = this.props;
            const { playtimeUpdatedAt } = this.state;

            if (stopped) {
                return;
            }

            this.setState({
                playtime: playtime + process.env.SPEED * (Date.now() - playtimeUpdatedAt)
            });
        }, 10);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    render() {
        const { home, away, incidents } = this.props;
        const { playtime } = this.state;

        return (
            <div className="game">
                <header>
                    <span className="game__team game__team--home">{ home }</span>
                    <span className="game__timer">{ formatTime(playtime) }</span>
                    <span className="game__team game__team--away">{ away }</span>
                </header>

                <Statistics
                    options={
                        VISIBLE_STATISTICS.map(option => {
                            return {
                                ...option,
                                home: incidents.filter(i => i.team === 'home' && i.type === option.id).length,
                                away: incidents.filter(i => i.team === 'away' && i.type === option.id).length
                            };
                        })
                    }
                />

                <Timeline
                    width={ 450 }
                    viewportHeight={ 300 }
                    heightPerSecond={ 3 }
                    incidents={ incidents }
                    playtime={ playtime }
                />
            </div>
        );
    }
}

export default Game;
