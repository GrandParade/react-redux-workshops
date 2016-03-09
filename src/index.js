import React from 'react';
import { render } from 'react-dom';

var App = require('./components/App');

render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept(
        require.resolve('./components/App'),
        () => {
            App = require('./components/App');

            render(<App />, document.getElementById('app'));
        }
    );
}
