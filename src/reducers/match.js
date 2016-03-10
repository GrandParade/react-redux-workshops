export default function setMatchInfo(state = {}, action) {
    if (action.type === 'set match info') {
        state = { ...action.match };
    }

    return state;
}
