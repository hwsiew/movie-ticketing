import createRequest from './createRequest';

/**
 * To fetch single movie by Id
 * 
 * @param {String} movieId 
 * @returns {Promise}  
 */
export default function fetchMovie (movieId) {
	const path = `movie/${movieId}`;
	return createRequest(path);
}