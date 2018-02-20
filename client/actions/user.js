export function setUserData(data){
	return (dispatch, getState) => {
		dispatch({
			type: 'USER_SET_DATA',
			data: data
		})
	}
}

export function clearUserData(){
	return (dispatch, getState) => {
		dispatch({
			type: 'USER_CLEAR_DATA'
		})
	}
}