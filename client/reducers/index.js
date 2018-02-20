import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//reducer
import comment from './comment';
import thread from './thread';
import user from './user';

const rootReducer = combineReducers({
	comment,
	thread,
	user,
	routing: routerReducer
});

export default rootReducer;