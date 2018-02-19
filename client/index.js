import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

//assets
import { CONFIG } from './assets/config';

//css
import css from './styles/style.styl';

//library
import firebase from 'firebase';

//pages
import App from './pages/index';
import ThreadList from './pages/thread/thread-list';

//store
import store, { history } from './store'

firebase.initializeApp(CONFIG.LIBRARY.FIREBASE.CONFIG);

const router = (
	<Provider store={store}>
		<Router
			history={ history }
		>
			<Route path="/" component={ App }>
				<IndexRoute component={ ThreadList }></IndexRoute>
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('root'));