//library
import firebase from 'firebase';

//utisl
import { getUsernameFromEmail } from '../utils/helpers/stringManipulation'

export function getThreadList(){
	return (dispatch, getState) => {
		let dbThread = firebase.database().ref('todos')
		dbThread.on('value', (res) => {
			dispatch({
				type: 'THREAD_GET_LIST',
				data: res.val()
			})
		})
	}
}

export function setThreadStatus(id, status){
	return (dispatch, getState) => {
		// const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);
		const CURRENT_USER = 'anonymous';

		let dbThread = firebase.database().ref('todos').child(id)
		dbThread.update({
			isDone: status,
			updatedAt: Date.now(),
			updatedBy: CURRENT_USER
		});
	}
}