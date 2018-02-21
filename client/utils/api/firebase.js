//library
import firebase from 'firebase';

//utils
import { getUsernameFromEmail } from '../helpers/stringManipulation'

export function addComment(id, text){
	const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);
	
	console.log('CURRENT_USER: ', CURRENT_USER);

	let dbComments = firebase.database().ref('comments').child(id)
	dbComments.push({
		name: CURRENT_USER,
		text: text,
		timestamp: Date.now()
	});
}

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

export function isFinishedTypingComment(id){
	const CURRENT_USER = getCurrentUsername();

	let dbIsTyping = firebase.database().ref('isTyping').child(id).child(CURRENT_USER);
	dbIsTyping.remove();
}

export function isTypingComment(id, text){
	const CURRENT_USER = getCurrentUsername();

	let dbIsTyping = firebase.database().ref('isTyping').child(id).child(CURRENT_USER);
	dbIsTyping.set({
		text: text
	});
}

export function getThread(threadId = null){
	return new Promise((resolve, reject) => {
		let dbThread = firebase.database().ref(`todos${threadId ? '/' + threadId : ''}`);

		dbThread.on('value', (res) => {
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

export function signOut(){
	return new Promise((resolve, reject) => {
		firebase.auth().signOut()
			.then(() => {
				console.log('signOut: ', firebase.auth().currentUser);
				resolve({status: true, data: null})
			})
	})
}

export function getCurrentUser(){
	return new Promise((resolve, reject) => {
		resolve(firebase.auth().currentUser)
	})
}

export function getCurrentUsername(){
	return getUsernameFromEmail(firebase.auth().currentUser.email)
}