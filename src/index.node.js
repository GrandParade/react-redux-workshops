import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './components/App';

export default ReactDOMServer.renderToString(<App />);
