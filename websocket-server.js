import MatchService from './match-service';

module.exports = function attachWebSocketServer(httpServer) {
    let io = require('socket.io')(httpServer);

    let authenticatedSockets = [];

    let nicks = [];

    function removeNick(nick) {
        let idx = nicks.indexOf(nick);

        if (idx !== -1) {
            nicks.splice(idx, 1);
        }
    }

    let match = new MatchService(incident => {
        authenticatedSockets
            .filter(socket => socket._match === match.id)
            .forEach(socket => socket.emit('incident', incident));
    });

    io.on('connection', socket => {
        console.log('New socket connected');

        socket.on('subscribe', name => {
            if (socket._name !== void 0) {
                removeNick(socket._name);
            }

            socket._name = name;
            socket._match = match.id;

            for (let i = 1; nicks.indexOf(socket._name) !== -1; i++) {
                socket._name = name + ' #' + i;
            }

            nicks.push(socket._name);

            if (authenticatedSockets.includes(socket)) {
                return;
            }

            authenticatedSockets.push(socket);

            io.emit('user connected', socket._name);

            socket.on('disconnect', () => {
                removeNick(socket._name);
                io.emit('user disconnected', socket._name);

                authenticatedSockets.splice(authenticatedSockets.indexOf(socket), 1);
            });

            // Chat
            socket.on('message', message => {
                io.emit('message', {
                    user: socket._name,
                    message
                });
            });

            // Match
            socket.emit('match', match.data);

            match.incidents.forEach(incident => socket.emit('incident', incident));
        });
    });

    return io;
};
