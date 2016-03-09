import React, { PropTypes } from 'react';

class Tabs extends React.Component {
    static propTypes = {
        active: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ).isRequired
    };

    onClick(tab, e) {
        const { active, onChange } = this.props;

        e.preventDefault();

        if (tab.id !== active && onChange) {
            onChange(tab.id);
        }
    }

    render() {
        const { tabs, active } = this.props;

        return (
            <ul className="tabs">
                {
                    tabs.map(tab => (
                        <li key={ tab.id } className={ active === tab.id ? 'active' : '' }>
                            <a href="#" onClick={ this.onClick.bind(this, tab) }>{ tab.name }</a>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default Tabs;
