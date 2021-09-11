// import config from './config';
import createRequest from './createRequest';

/**
 * To book ticket(s) for user
 *
 * @param {string} movieId
 * @param {string} slotId
 * @param {string} userId
 * @param {string[]} seatIds
 * @return {Promise}	
 */
export default function bookTickets(movieId, slotId, userId, seatIds){

	const path = `movie/${movieId}/slot/${slotId}/${userId}`;
	const option = {
		method: "POST",
		body: JSON.stringify(seatIds),
		headers: {
      'Content-Type': 'application/json'
    },
	}

	return createRequest(path,option);

}