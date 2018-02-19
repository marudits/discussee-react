import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from './store'

//css
import css from './styles/style.styl';

//pages
import App from './pages/index';

const router = (
	<Provider store={store}>
		<Router
			history={ history }
		>
			<Route path="/" component={ App }>
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('root'));