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
import ThreadDetail from './pages/thread/thread-detail';
import ThreadForm from './pages/thread/thread-form';
import Auth from './pages/auth/auth';

//store
import store, { history } from './store'

firebase.initializeApp(CONFIG.LIBRARY.FIREBASE.CONFIG);

const router = (
	<Provider store={store}>
		<Router
			history={ history }
		>
			<Route path="/" component={ App } onEnter={(n, r) => onEnterHook(n, r)}>
				<IndexRoute component={ ThreadList }></IndexRoute>
				<Route path="/auth" component={ Auth }></Route>
				<Route path="/detail/:id" component={ ThreadDetail }></Route>
				<Route path="/add" component={ ThreadForm }></Route>
				<Route path="/update/:id" component={ ThreadForm }></Route>
			</Route>
		</Router>
	</Provider>
)

function onEnterHook(nextState, replace){
	if(nextState.location.pathname === '/auth'){
		replace('/');
	}
}

render(router, document.getElementById('root'));