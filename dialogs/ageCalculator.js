'use strict'

module.exports = async function (req, res, next) {
	const date = (typeof req.body.queryResult.outputContexts[0].parameters.dateOfBirth !== 'undefined') ? req.body.queryResult.outputContexts[0].parameters.dateOfBirth : ''
	console.log('Date: ', date)
	let msg = ''
	let resp = []
	if (!date) {
		msg = `please tell me your date of birth`
		//msg= `please tell me a date and I will see what happened then`
		resp.push({ text: { text: [`${msg}`] } })

	} else {
		console.log('Date: ', date)
		//const actualAge = getAge(date)
		const historicEvent = getEvents(date)
		//msg = `${actualAge}`		
		msg =  `${historicEvent}`;
		console.log(msg);
		resp.push({ text: { text: [`${msg}`] } })
	}
	return res.status(200).json({
		fulfillmentText: msg,
		fulfillmentMessages: resp
	})
}

function getAge(dateOfBirth) {
	var today = new Date();
	var birthDate = new Date(dateOfBirth);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age = age - 1;
	}

	return `<speak>
				<audio src="https://actions.google.com/sounds/v1/cartoon/woodpecker.ogg"/>
				<prosody pitch="low">your current age is ${age}
			</prosody></speak>` ;
}

function getEvents(eventDate){
	var tmpDate = new Date(eventDate).toLocaleDateString()	
	
	var response = '';
	switch(tmpDate){
		case `7/27/2016`:
			response = `<speak>
							<audio src="https://actions.google.com/sounds/v1/cartoon/snare_roll_tumbling.ogg"/>
							<prosody pitch="high">
								on this date Atlético Nacional won libertadores cup
							</prosody>
						</speak>`;
		break;		
		case `06/07/1982`:
			response = 'on this date this speaker was born';			
	}
	return response;
}
