import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//reducer
import comment from './comment';
import thread from './thread';

const rootReducer = combineReducers({
	comment,
	thread,
	routing: routerReducer
});

export default rootReducer;