import { createStore } from 'redux';

function reduce(state, action) {
    console.log('Action happened', action);

    return state;
}

export default createStore(
    reduce,
    {
        match: {},
        incidents: [],
        messages: []
    },
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
);
