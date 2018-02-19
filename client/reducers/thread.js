const defaultState = [];

function thread(state = defaultState, action){
	let newState = Object.assign({}, state),
		{ type, data } = action;

	switch(type){
		case 'THREAD_GET_LIST':
			newState.list = data;
			return newState;
		default:
			return newState;
	}
}

export default thread;