import userReducer, {
  signIn,
  signOut, 
	addTickets,
	getTickets,
	userBookTickets
} from './userSlice';

const USER_ID = 'abc';

describe('User state management', function(){

	const initialState = {
		details: null,
		tickets: [], 
		status: 'idle',
		loaded: false
	};

	 it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
			details: null,
			tickets: [], 
			status: 'idle',
			loaded: false
		});
  });

	it('should sign user in', function(){
		const state = userReducer(initialState, signIn());
		expect(state.details).toEqual({
			id: 'abc'
		})
	});

	it('should sign user out', function(){
		const state = userReducer(initialState, signOut());
		expect(state.details).toEqual(null);
	});

	it('should add ticket for user', function(){
		const tickets = ['ticket1','ticket2'];
		const state = userReducer(initialState,addTickets(tickets));
		expect(state.tickets).toEqual(tickets);
	});

	it('should get tickets of user', async function(){
		const action = {
			type: getTickets.fulfilled,
			payload: ['ticket'] 
		}
		const state = userReducer(initialState,action);
		expect(state.tickets).toEqual(['ticket']);
	});

	it('should book tickets of user', async function(){
		const action = {
			type: userBookTickets.fulfilled,
			payload: ['ticket','ticket2'] 
		}
		const state = userReducer(initialState,action);
		expect(state.tickets).toEqual(['ticket','ticket2']);
	});

});