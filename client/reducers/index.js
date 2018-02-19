import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//reducer
import thread from './thread';

const rootReducer = combineReducers({
	thread,
	routing: routerReducer
});

export default rootReducer;