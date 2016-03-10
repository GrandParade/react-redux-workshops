export default function receiveIncident(state = [], action) {
    if (action.type === 'incident received') {
        state = state.concat(action.incident);
    }

    return state;
}
