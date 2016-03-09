import React from 'react';

import Game from '../Game';

import match from '../../../matches/10431549.json';

import './App.scss';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            incidents: []
        };
    }

    componentDidMount() {
        let incidents = match.incidents.slice(),
            time = incidents[0].timestamp - 20000,
            timeDiff = Date.now() - time,
            startedAt = Date.now();

        this.interval = setInterval(() => {
            let nextIncidents = this.state.incidents;

            while (
                incidents.length &&
                incidents[0].timestamp < Date.now() - timeDiff + process.env.SPEED * (Date.now() - startedAt)
            ) {
                nextIncidents = nextIncidents.concat(incidents.shift());
            }

            this.setState({
                incidents: nextIncidents
            });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { incidents } = this.state;

        let lastIncident = incidents[incidents.length - 1];

        return (
            <div>
                <h1>Workshops: React & Redux</h1>
                <p>Real-time web application with React & Redux</p>

                <Game
                    home={ match.home }
                    away={ match.away }
                    incidents={ incidents }
                    playtime={ lastIncident ? lastIncident.playtime : 0 }
                    stopped={ lastIncident ? !lastIncident.clock : true }
                />
            </div>
        );
    }
}

export default App;
