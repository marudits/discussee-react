import moment from 'moment';

export function objectListToArray(list){
	let data = [];

	for(let key in list){
		data.push({...list[key], key: key})
	}

	return data;
}

export function calculateDiffTime(timestamp = Date.now()){
	let diffTime = (moment() - moment(new Date(timestamp))),
		sentTime = new Date(timestamp);

	let countDays =  moment.utc(diffTime).dayOfYear() - 1,
		countHours = moment.utc(diffTime).hour(),
		countMinutes = moment.utc(diffTime).minute(),
		countSeconds = moment.utc(diffTime).second();

	if(countDays > 1){
		return moment(sentTime).format('D/MM/YY').toString();
	} else if(countDays === 1){
		return `Yesterday ${moment(sentTime).format('HH:mm').toString()}`;
	} else {
		if(countHours >= 1){
			return `${countHours}h ago`;
		} else if(countMinutes >= 1) {
			return `${countMinutes}m ago`;
		} else {
			return `${countSeconds}s ago`;
		}
    }
}

export function getUsernameFromEmail(email){
	return email ? email.slice(0, email.indexOf('@')) : null
}