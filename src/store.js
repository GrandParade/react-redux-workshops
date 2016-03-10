import { createStore, combineReducers } from 'redux';

import receiveIncident from './reducers/incident';
import setMatchInfo from './reducers/match';

export default createStore(
    combineReducers({
        incidents: receiveIncident,
        match: setMatchInfo
    }),
    {
        match: {},
        incidents: []
    },
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
);
