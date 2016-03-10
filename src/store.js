import { createStore, combineReducers } from 'redux';

import receiveIncident from './reducers/incident';
import setMatchInfo from './reducers/match';
import receiveMessage from './reducers/message';

export default createStore(
    combineReducers({
        incidents: receiveIncident,
        match: setMatchInfo,
        messages: receiveMessage
    }),
    {
        match: {},
        incidents: [],
        messages: []
    },
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
);
