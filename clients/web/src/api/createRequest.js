import config from './config';

/*
 *	To standardize request making and error handling for all api fetch
 * 	@param {string} path  
 *	@return {Promise}
 */
export default function createRequest(path, option = {}){

	// to remove '/' at the beginning if any
	if(path.startsWith('/')){
		path = path.slice(1);
	}

	const base = `${config.protocol}://${config.host}${config.path}`;
	const url = `${base}/${path}`;

	return fetch(url,option)
						.then( async (response) => {
							if(response.ok){
								return response.json();
							} else {
								let errorResponse = await response.json();
								return Promise.reject(errorResponse.message)
							}
						})
						.then(data => data);
}