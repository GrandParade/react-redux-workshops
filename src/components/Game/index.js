import React, { PropTypes } from 'react';

import Statistics from '../Statistics';
import Timeline from '../Timeline';
import Tabs from '../Tabs';

import { time as formatTime } from '../../utils/format';

import './Game.scss';

const VISIBLE_STATISTICS = [
    { id: 'goal', name: 'Goals' },
    { id: 'dangerous attack', name: 'Dangerous attacks' },
    { id: 'shot on target', name: 'Shots on target' },
    { id: 'corner', name: 'Corners' }
];

const FULL_MATCH_TIME = '100000000';

const TABS = [
    { id: String(5 * 60000), name: '5 minutes' },
    { id: FULL_MATCH_TIME, name: 'Full match' }
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
            playtime: props.playtime,
            currentTab: FULL_MATCH_TIME,
            statistics: this.getStatistics(props, props.playtime, FULL_MATCH_TIME)
        };
    }

    componentDidMount() {
        this.startTimer(this.props.playtime);
    }

    componentWillReceiveProps(props) {
        if (this.interval && props.playtime !== this.props.playtime) {
            this.startTimer(props.playtime);
        }

        if (this.props.incidents !== props.incidents) {
            this.setState({
                statistics: this.getStatistics(props, props.playtime, this.state.currentTab)
            });
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    getStatistics(props, playtime, currentTab) {
        if (props.incidents === this.props.incidents && playtime === this.playtime && this.state) {
            return this.state.statistics;
        }

        const incidentsFrame = props.incidents.filter(i => playtime - currentTab < i.playtime);

        return VISIBLE_STATISTICS.map(stat => {
            return {
                ...stat,
                home: incidentsFrame.filter(i => i.team === 'home' && i.type === stat.id).length,
                away: incidentsFrame.filter(i => i.team === 'away' && i.type === stat.id).length
            };
        });
    }

    startTimer(time) {
        this.stopTimer();

        this.setState({
            playtime: time,
            playtimeUpdatedAt: Date.now(),
            statistics: this.getStatistics(this.props, time, this.state.currentTab)
        });

        this.interval = setInterval(() => {
            const { stopped, playtime } = this.props;
            const { playtimeUpdatedAt, currentTab } = this.state;

            if (stopped) {
                return;
            }

            let currentPlaytime = playtime + process.env.SPEED * (Date.now() - playtimeUpdatedAt);

            this.setState({
                statistics: this.getStatistics(this.props, time, currentTab),
                playtime: currentPlaytime
            });
        }, 10);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    changeTab(tab) {
        this.setState({
            currentTab: tab,
            statistics: this.getStatistics(this.props, this.state.playtime, tab)
        });
    }

    render() {
        const { home, away, incidents } = this.props;
        const { playtime, statistics, currentTab } = this.state;

        return (
            <div className="game">
                <header>
                    <span className="game__team game__team--home">{ home }</span>
                    <span className="game__timer">{ formatTime(playtime) }</span>
                    <span className="game__team game__team--away">{ away }</span>
                </header>

                <Statistics
                    options={ statistics }
                />

                <Timeline
                    width={ 450 }
                    viewportHeight={ 300 }
                    heightPerSecond={ 3 }
                    incidents={ incidents }
                    playtime={ playtime }
                />

                <Tabs
                    active={ currentTab }
                    onChange={ this.changeTab.bind(this) }
                    tabs={ TABS }
                />
            </div>
        );
    }
}

export default Game;
