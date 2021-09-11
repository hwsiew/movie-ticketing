import createRequest from './createRequest';

/**
 *	To fetch all movies from server
 *	@return {Promise}
 */
export default async function fetchMovies(){
	let path = 'movie/all';
	return createRequest(path);
}
