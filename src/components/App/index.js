import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

import Game from '../Game';
import Chat from '../Chat';

import './App.scss';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            messages: [
                { user: 'Dawid', message: 'Ble ble ble' },
                { user: 'Andrew', message: 'Lorem ipsum dolor sit amet' }
            ]
        };
    }

    addMessage(message) {
        this.setState({
            messages: this.state.messages.concat({
                user: 'You',
                message
            })
        });
    }

    render() {
        const { messages } = this.state;

        return (
            <div>
                <h1>Workshops: React & Redux</h1>
                <p>Real-time web application with React & Redux</p>

                <Provider store={ store }>
                    <div>
                        <Game />
                        <Chat />
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
