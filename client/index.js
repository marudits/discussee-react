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

//utils
import { getCurrentUser } from './utils/api/firebase';

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
	let currentUser = firebase.auth().currentUser;
	let{ pathname } = nextState.location,
		requiresAuth = ['/auth'].indexOf(pathname) === -1;

	// console.log('onEnterHook: currentUser: ', currentUser, ' | pathname: ', pathname, ' | requiresAuth: ', requiresAuth);
	
	// if(requiresAuth && !currentUser){
	// 	replace('/auth')
	// } else if(!requiresAuth && currentUser){
	// 	replace('/');
	// } else {
	// 	replace();
	// }
}

// history.listenBefore((location, done) => {
// 	let currentUser = firebase.auth().currentUser,
// 		{ pathname } = location,
// 		requiresAuth = ['/auth'].indexOf(pathname) === -1;
	
// 	// console.log('history.listenBefore: currentUser: ', currentUser, ' | pathname: ', pathname, ' | requiresAuth: ', requiresAuth);

// 	if(requiresAuth && !currentUser){
// 		history.go('/auth');
// 	} else if(!requiresAuth && currentUser){
// 		history.go('/')
// 	} else {
// 		done();	
// 	}
// })

render(router, document.getElementById('root'));