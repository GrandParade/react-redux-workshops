import store from './store';

import setMatchInfo from './actions/match';
import receiveIncident from './actions/incident';
import { receive as receiveMessage } from './actions/message';

let socket;

if (typeof window !== 'undefined') {
    socket = window.io();

    socket.on('connect', () => {
        setTimeout(() => socket.emit('subscribe', 'User', x => x));
    });

    socket.on('match', matchInfo => store.dispatch(setMatchInfo(matchInfo)));
    socket.on('incident', incident => store.dispatch(receiveIncident(incident)));
    socket.on('message', message => store.dispatch(receiveMessage(message)));

    window.store = store;
}

export default socket;
