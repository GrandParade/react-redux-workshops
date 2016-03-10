import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import './Chat.scss';

class Chat extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string,
                message: PropTypes.string
            })
        ),
        onSendMessage: PropTypes.func
    };

    static defaultProps = {
        messages: [],
        onSendMessage: () => {}
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            message: ''
        };
    }

    componentDidUpdate(props) {
        if (props.messages !== this.props.messages) {
            this.scrollDown();
        }
    }

    scrollDown() {
        const { messages } = this.refs;

        let node = messages && ReactDOM.findDOMNode(messages);

        if (node) {
            node.scrollTop = 1000000;
        }
    }

    onSubmit(e) {
        const { onSendMessage } = this.props;
        const { message } = this.state;

        e.preventDefault();

        if (message !== '') {
            onSendMessage(message);
        }

        this.setMessage('');
    }

    setMessage(message) {
        this.setState({
            message
        });
    }

    render() {
        const { messages } = this.props;
        const { message } = this.state;

        const valueLink = {
            requestChange: this.setMessage.bind(this),
            value: message
        };

        return (
            <div className="chat">
                <ul className="chat__messages" ref="messages">
                    {
                        messages.map((entry, idx) => (
                            <li key={ idx }>
                                <strong>{ entry.user }:</strong>
                                { entry.message }
                            </li>
                        ))
                    }
                </ul>
                <form className="chat__form" onSubmit={ this.onSubmit.bind(this) }>
                    <input type="text" name="message" valueLink={ valueLink } />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default Chat;
