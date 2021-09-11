import movieReducer, {
	updateSeatAvailability,
	fetchAllMovies
} from './movieSlice';

describe('Movie state mangement', function(){
	
	const initialState = {
		movies: [],
		status: 'idle',
	};

	it('should handle initial state', function(){
		expect(movieReducer(undefined,{})).toEqual({
			movies: [],
			status: 'idle',
		});
	});

	const movies = [
		{
			id: 'movieId',
			slots: [
				{
					id: 'slotId',
					seats: [
						{
							id: 'a1',
							availability: true
						}
					]
				}
			]
		}
	];

	it('should get a list of movies', function(){
		const action = {
			type: fetchAllMovies.fulfilled,
			payload: [...movies]
		};
		const state = movieReducer(initialState,action);
		expect(state.movies).toEqual([...movies]);
	})

	it('should update seat availability by ticket status', function(){
		const action = {
			type: fetchAllMovies.fulfilled,
			payload: [...movies]
		};
		const tickets = [
			{
				id: 'ticketId',
				movie: {
					id: 'movieId'
				},
				slot: {
					id: 'slotId'
				},
				seat: {
					id: 'a1',
					availability: false
				}
			}
		]
		let updatedState = movieReducer(initialState,action);
		updatedState = movieReducer(updatedState, updateSeatAvailability(tickets));
		expect(updatedState.movies[0].slots[0].seats[0].availability).toEqual(false);
	});

});