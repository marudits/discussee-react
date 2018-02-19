export function objectListToArray(list){
	let data = [];

	for(let key in list){
		data.push({...list[key], key: key})
	}

	return data;
}