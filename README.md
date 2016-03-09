GP React Lunch&Learn
====================

Introduction
------------

We will learn basics of React and Redux. Main things which will be described:

- What are basic features of ES6
- How Virtual DOM works
- What are Web Components
- What is JSX
- How to build basic React components
- How to share data between React components
- How works component lifecycle
- What is Redux and what are advantages of uni-directional flow
- How to optimize component' performance

What additional things you will find in project:

- How to properly configure boilerplate for development of React application
- How to use Webpack
- How to configure ESLint
- How to make isomorphic React application
- How to use WebSocket

Few of used libraries
---------------------

- **[Babel](https://babeljs.io/)**
  Allow to transpile ES6/ES7 (and even custom code like JSX) to ES5
- **[React](https://facebook.github.io/react/)**
  Facebook library for creating JS views with Virtual DOM
- **[Redux](http://redux.js.org/)**
  Library for managing application state. One of Flux implementations (even recommended by Facebook)
- **[ESLint](http://eslint.org/)**
  JS linter to keep proper code style
- **[Webpack](https://webpack.github.io/)**
  Modular library to build/parse code
- **[React Hot Module Replacement](https://github.com/gaearon/react-transform-hmr)**
  Dynamically update React components for development (with Webpack)
- **[socket.io](http://socket.io/)**
  Library which helps to deal with web sockets

Very helpful tools
------------------

- **[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)**
  Allow to see exactly what happened in Redux store, you can also use [universal version](https://github.com/gaearon/redux-devtools), which is not only for Chrome and has custom monitors
- **[React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)**
  Allow to inspect state and props of React components
  
Also worth to see
-----------------

- **[ES6 overview in 350 bullets](https://ponyfoo.com/articles/es6)**
  Pretty good list of ES6 features
- **[Redux tutorial](https://github.com/happypoulp/redux-tutorial/)**
  Interesting tutorial of Redux basics
- **[Web Components](http://webcomponents.org/)**
  Place with interesting articles about Web Components

How to run application
----------------------

- Run `npm install` to install dependencies
- Run `npm start` to run application on 5555 port
- If you want to multiple speed you can set `SPEED` environmental variable which will be available as `process.env.SPEED` in-code, e.g. `SPEED=10 npm start`

WebSocket API
-------------

We are using here **socket.io** for web sockets. You can connect directly on `/` URI and there are few events emitted and accepted.
After connection you have to send **subscribe** event with **username** as plain-text message. Then you can:

**Listen to:**
- *message* - JSON with `user` and `message` sent by chat
- *match* - JSON information about current match
- *incident* - JSON information with new incident
- *user connected* - name of user who has been connected
- *user disconnected* - name of user who has been disconnected

**Emit:**
- *message* - with message as plain-text to send message by chat

Navigation through steps
------------------------

After **N** step there is created tag **step-N**, so you can navigate through steps by `git checkout step-N` command

Step 0
------

Prepare small isomorphic application boilerplate to run our application on it and WebSocket server to send match information and allow chatting

Step 1
------

Prepare first component which will have props transferred by another one

Step 2
------

Prepare component which is mapping array of objects to DOM elements

Step 3
------

Prepare timer with playtime which will be updated by time interval (component lifecycle & state)

Step 4
------

Use React for SVG element - timeline

Step 5
------

Interact with user - DOM listeners

Step 6
------

Optimize React components with `React Perf` addon

Step 7
------

Prepare chat component which will show list of messages and allow to send message

Step 8
------

Prepare simple Redux store and see how Redux DevTools works

Step 9
------

Prepare action creators and reducers for match information and new incidents

Step 10
-------

Connect views with application state

Step 11
-------

Prepare chat to work through web sockets
