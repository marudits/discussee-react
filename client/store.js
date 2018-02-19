import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//reducers
import rootReducer from './reducers/index';

const defaultState = {
	thread: {},
	comment: {}
}

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk)));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;