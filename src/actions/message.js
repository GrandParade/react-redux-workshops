import socket from '../connect';

export function receive(message) {
    return {
        type: 'message received',
        message
    };
}

export function send(message) {
    if (socket) {
        socket.emit('message', message, x => x);
    }

    return {
        type: 'send message',
        message
    };
}
