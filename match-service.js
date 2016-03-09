import path from 'path';
import glob from 'glob';

const SPEED = process.env.SPEED || 1;

class MatchService {
    constructor(onChange) {
        if (typeof onChange !== 'function') {
            throw new Error('Match service require `onChange` callback');
        }

        this.onChange = onChange;
        this.matches = [];

        glob('matches/*.json', (err, files) => {
            this.matches = files.map(file => require(path.join(__dirname, file)));

            this.start();
        });
    }

    random() {
        let len = this.matches.length,
            match;

        do {
            match = this.matches[Math.floor(Math.random() * len) % len];
        } while (match.id === this.id);

        return match;
    }

    start() {
        this.data = Object.assign({}, this.random());
        this.incidents = [];
        this.id = this.data.id;

        let incidents = this.data.incidents.slice();
        delete this.data.incidents;

        this.startedAt = incidents[0].timestamp - 20000;

        let timeDiff = Date.now() - this.startedAt;

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            let speedDiff = Date.now() - this.startedAt - timeDiff;

            while (incidents.length && incidents[0].timestamp < this.startedAt + speedDiff * SPEED) {
                let incident = incidents.shift();

                this.incidents.push(incident);
                this.onChange(incident);
            }

            if (!incidents.length) {
                this.start();
            }
        }, 10);

        console.log('Started match', this.data.home, 'vs', this.data.away);
    }
}

export default MatchService;
