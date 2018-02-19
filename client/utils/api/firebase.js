import firebase from 'firebase';

export function getComments(threadId = null){
	return new Promise((resolve, reject) => {
		let dbComments = firebase.database().ref('comments');

		dbComments.child(threadId).on('value', (res) => {
			if(!res.val()){
				resolve(null)
			} else {
				resolve(res.val())
			}
		});		
	})
}

export function signIn(email, password){
	return new Promise((resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				resolve({ status: true, data: user });
			}, (err) => {
				reject({ status: false, data: err });
			})	
	})
}