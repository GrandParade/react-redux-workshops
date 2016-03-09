import React from 'react';

import Game from '../Game';

import match from '../../../matches/10431549.json';

import './App.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Workshops: React & Redux</h1>
                <p>Real-time web application with React & Redux</p>

                <Game
                    home={ match.home }
                    away={ match.away }
                    playtime={ 444000 }
                />
            </div>
        );
    }
}

export default App;
