//utils
import { getUsernameFromEmail } from '../utils/helpers/stringManipulation';

const defaultState = [];

export default function user(state = defaultState, action){
	let newState = Object.assign({}, state),
		{ type, data } = action;

	switch(type){
		case 'USER_SET_DATA':
			newState.data = {
				email: data.email,
				username: getUsernameFromEmail(data.email),
				lastLoginAt: new Date(data.metadata.lastSignInTime),
				registerAt: new Date(data.metadata.creationTime)
			};
			return newState;
		case 'USER_CLEAR_DATA':
			newState.data = null;
			return newState;
		default:
			return newState;
	}
}