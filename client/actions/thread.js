export function getThreadList(){
	return (dispatch, getState) => {
		dispatch({
			type: 'THREAD_GET_LIST',
			data: {
				"1": {
					id: 1,
					title: 'Marudi',
					desc: 'Lorem ipsum dolor sit amet'
				},
				"2": {
					id: 2,
					title: 'Tri',
					desc: 'Lorem ipsum dolor sit amet'
				},
				"3": {
					id: 3,
					title: 'Subakti',
					desc: 'Lorem ipsum dolor sit amet'
				}
			}
		})
	}
}