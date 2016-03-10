import React, { PropTypes } from 'react';
import { calculateBoxPoints, calculateMomentumPoints, calculatePoint } from '../../utils/timeline';

import './Timeline.scss';

class Timeline extends React.Component {
    static propTypes = {
        incidents: PropTypes.arrayOf(PropTypes.object),
        width: PropTypes.number,
        viewportHeight: PropTypes.number,
        heightPerSecond: PropTypes.number,
        playtime: PropTypes.number
    };

    static defaultProps = {
        width: 450,
        viewportHeight: 300,
        heightPerSecond: 3,
        incidents: [],
        playtime: 0
    };

    shouldComponentUpdate(props) {
        return Object.keys(this.constructor.propTypes).filter(x => this.props[x] !== props[x]).length;
    }

    render() {
        const { incidents, width, viewportHeight, heightPerSecond, playtime } = this.props;

        const currentHeight = heightPerSecond * playtime / 1000;

        let startBox;
        if (currentHeight - viewportHeight < 0) {
            startBox = (
                <polygon points={ calculateBoxPoints(width, viewportHeight - currentHeight) } />
            );
        }

        const transformAboveStart = 'translate(0, ' + Math.max(viewportHeight - currentHeight - 1, 0) + ')';

        return (
            <section className="timeline">
                <svg width={ width } height={ Math.max(viewportHeight, currentHeight) }>
                    { startBox }

                    <polygon
                        points={ calculateMomentumPoints(incidents, playtime, width, heightPerSecond) }
                        transform={ transformAboveStart }
                    />

                    <g transform={ transformAboveStart }>
                        {
                            incidents.map((incident, idx) => (
                                <circle
                                    key={ idx }
                                    className="timeline__incident"
                                    { ...calculatePoint(incident, width, heightPerSecond) }
                                    r="10"
                                />
                            ))
                        }
                    </g>
                </svg>
            </section>
        );
    }
}

export default Timeline;
