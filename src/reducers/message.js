export default function receiveMessage(state = [], action) {
    if (action.type === 'message received') {
        state = state.concat(action.message);
    }

    return state;
}
