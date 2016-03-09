import React, { PropTypes } from 'react';

import './Statistics.scss';

class Statistics extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string.isRequired,
                home: PropTypes.number,
                away: PropTypes.number
            })
        )
    };

    static defaultProps = {
        options: []
    };

    render() {
        const { options } = this.props;

        return (
            <ul className="statistics">
                {
                    options.map(option => {
                        let value = (100 * option.home / (option.home + option.away)) || 0;

                        if (option.home === 0 && option.away === 0) {
                            value = 50;
                        }

                        return (
                            <li key={ option.id }>
                                <span className="statistics__score statistics__score--home">{ option.home || 0 }</span>
                                <span className="statistics__score statistics__score--away">{ option.away || 0 }</span>
                                <span className="statistics__name">{ option.name }</span>
                                <span className="statistics__progress" style={ { width: value + '%' } } />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default Statistics;
