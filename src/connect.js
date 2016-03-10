import store from './store';

import setMatchInfo from './actions/match';
import receiveIncident from './actions/incident';

const socket = window.io();

socket.on('connect', () => socket.emit('subscribe', 'User', x => x));

socket.on('match', matchInfo => store.dispatch(setMatchInfo(matchInfo)));
socket.on('incident', incident => store.dispatch(receiveIncident(incident)));

window.store = store;
