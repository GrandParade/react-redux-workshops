import React from 'react';
import ReactDOMServer from 'react-dom/server';

import './store';

import App from './components/App';

export default ReactDOMServer.renderToString(<App />);
