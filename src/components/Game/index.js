import React, { PropTypes } from 'react';

import Statistics from '../Statistics';

import { time as formatTime } from '../../utils/format';

import './Game.scss';

class Game extends React.Component {
    static propTypes = {
        home: PropTypes.string,
        away: PropTypes.string,
        playtime: PropTypes.number,
        stopped: PropTypes.bool
    };

    static defaultProps = {
        home: 'Team 1',
        away: 'Team 2',
        playtime: 0,
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
        const { home, away } = this.props;
        const { playtime } = this.state;

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
