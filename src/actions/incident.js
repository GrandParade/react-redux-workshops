export default function receiveIncident(incident) {
    return {
        type: 'incident received',
        incident
    };
}
