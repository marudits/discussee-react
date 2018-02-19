//library
import firebase from 'firebase';

export function getCommentList(threadId = null){
	return (dispatch, getState) => {
		let dbComment = firebase.database().ref(`comments${threadId ? '/' + threadId : '' }`)

		dbComment.on('value', (res) => {
			console.log('getCommentList: ', res);
			dispatch({
				type: 'COMMENT_GET_LIST',
				data: res.val()
			})
		})
	}
}