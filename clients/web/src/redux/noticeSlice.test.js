import noticeReducer, {
	error,
	dismissError
} from './noticeSlice';

describe('Notice state management', function(){

	const initialState = {
		error: null,
		warning: null,
		info: null
	};

	it('should handle initial state', () => {
    expect(noticeReducer(undefined, { type: 'unknown' })).toEqual({
			error: null,
			warning: null,
			info: null
		});
  });

	it('should set an error', function(){
		const state = noticeReducer(initialState, error({message:'Something\s wrong'}));
		expect(state.error).toEqual({message:'Something\s wrong'});
	});

	it('should clear an error', function(){
		const state = noticeReducer(initialState, dismissError());
		expect(state.error).toEqual(null);
	});

});