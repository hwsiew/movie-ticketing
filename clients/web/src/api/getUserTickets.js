import createRequest from './createRequest';

/**
 * to fetch all tickets previously booked by user
 * @param {string} userId 
 * @return {Promise}
 */
export default function getUserTickets (userId){
	const path = `ticket/${userId}`;
	return createRequest(path);
}