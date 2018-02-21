//library
import firebase from 'firebase';

//utils
import { objectListToArray } from '../utils/helpers/stringManipulation';

export function getCommentList(threadId = null){
	return (dispatch, getState) => {
		let dbComment = firebase.database().ref(`comments${threadId ? '/' + threadId : '' }`)
		
		dbComment.on('value', (res) => {
			dispatch({
				type: 'COMMENT_GET_LIST',
				data: res.val()
			})
		})
	}
}

export function getIsTyping(threadId){
	return (dispatch, getState) => {
		let dbIsTyping = firebase.database().ref('isTyping').child(threadId)

		dbIsTyping.on('value', (res) => {
			dispatch({
				type: 'COMMENT_GET_ISTYPING',
				data: {
					threadId: threadId,
					list: res.val() ? objectListToArray(res.val()) : []
				}
			});
		});
	}
	
}