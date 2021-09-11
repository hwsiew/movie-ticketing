import config from './config.js';
import {
	fetchMovies,
	fetchMovie,
	bookTickets,
	getUserTickets
} from '.';

const MOVIE_ID = '1234';
const USER_ID  = 'user123';
const INVALID = 'invalid';
const SLOT_ID = 'slot';
const SEAT_IDS = ['a1','a2','a3'];
const INVALID_SEAT_ID = 'a4';

async function mockFetch(url, option){

	const base = `${config.protocol}://${config.host}${config.path}`;
	let path = '';

	if(url.startsWith(base)){
		path = url.slice(base.length);
	}

	let response = {
		ok: true,
		status: 200,
		json: async () => null
	};
 
	switch (path) {
		case '/movie/all':
			response.json = async () => ['movie1','movie2'];
			return response;
			break;
		case `/movie/${MOVIE_ID}`:
			response.json = async () => ({ id: MOVIE_ID });
			return response;
		case `/movie/${INVALID}`:
			response.ok = false;
			response.status = 400;
			response.json = async () => ({ message: 'Invalid movie id.' });
			return response;
		case `/ticket/${USER_ID}`:
			response.json = async () => ['ticket1','ticket2'];
			return response;
		case `/ticket/${INVALID}`:
			response.ok = false;
			response.status = 400;
			response.json = async () => ({ message: 'Invalid user.' });
			return response;
		case `/movie/${MOVIE_ID}/slot/${SLOT_ID}/${USER_ID}`:
			let seatIds = JSON.parse(option.body);

			// fail request if it include an invalid seat id
			if(seatIds.indexOf(INVALID_SEAT_ID) !== -1){
				response.ok = false;
				response.status = 400;
				response.json = async () => ({ message: 'Seat is not available.' });
				return response;
			}

			response.json = async () => {
				let tickets = [];
				for(let seatId of seatIds){
					tickets.push({
						number: seatId
					});
				}
				return tickets;
			}
			return response;
		default:
			return response;
	}

}

beforeAll(() => jest.spyOn(global, 'fetch'));
beforeEach(() => global.fetch.mockImplementation(mockFetch));

describe('Fetch all movies', function(){
	it('should fetch movies', async () => {
		const movies = await fetchMovies();
		expect(movies).toEqual(['movie1','movie2']);
		expect(fetch).toHaveBeenCalledTimes(1);
	});
});

describe('Fetch movie by id', function(){
	it('should fetch a movie by id', async () => {
		const movie = await fetchMovie(MOVIE_ID);
		expect(movie).toEqual({id: MOVIE_ID});
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	it('should fail to fetch a movie by id', async () => {
		expect.assertions(1);
		return fetchMovie(INVALID).catch(e => expect(e).toEqual('Invalid movie id.'));
	});
});

describe('User operations', function(){
	it('should get user\'s tickets', async () => {
		const tickets = await getUserTickets(USER_ID);
		expect(tickets).toEqual(['ticket1','ticket2']);
		expect(fetch).toHaveBeenCalledTimes(1);
	});

	it('should fail to get user\'s tickets', async () => {
		expect.assertions(1);
		return getUserTickets(INVALID).catch(e => expect(e).toEqual('Invalid user.'));
	});

	it('should book tickets for user', async () => {
		const tickets = await bookTickets(MOVIE_ID, SLOT_ID, USER_ID, SEAT_IDS);
		const result = [];
		for(let seatId of SEAT_IDS){
			result.push({
				number: seatId
			});
		}
		expect(tickets).toEqual(result);
	});

	it('should fail to book tickets for user', async () => {
		expect.assertions(1);
		let seatIds = [...SEAT_IDS, INVALID_SEAT_ID];
		return bookTickets(MOVIE_ID, SLOT_ID, USER_ID, seatIds).catch(e => expect(e).toEqual('Seat is not available.'));
	});
});

