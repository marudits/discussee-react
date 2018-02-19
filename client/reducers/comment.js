const defaultState = [];

function comment(state = defaultState, action){
	let newState = Object.assign({}, state),
		{ type, data } = action;

	switch(type){
		case 'COMMENT_GET_LIST':
			newState.list = data;
			return newState;
		case 'COMMENT_GET_DETAIL_LIST':
			newState.detail = data;
			return newState;
		default:
			return newState;
	}
}

export default comment;