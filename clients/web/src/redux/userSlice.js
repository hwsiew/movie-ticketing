import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  bookTickets,
  getUserTickets
} from '../api';

// try to get user from sessionStorage
// No authentication is implemented in this app, so user are created dynamically and store in sessionStorage
const user = sessionStorage.getItem('user');
const initialState = {
	details: user ? JSON.parse(user) : null, // an object to represent user 
  tickets: [], // list of tickets by user
  status: 'idle', // status of user async actions
  loaded: false // to check if 
};

// An async action to book tickets for user
export const userBookTickets = createAsyncThunk(
  'userService/bookTickets',
  async ({movieId, slotId, userId, seatIds}, {dispatch}) => {
    try {
      const tickets = await bookTickets(movieId, slotId, userId, seatIds);  
      return tickets; 
    } catch (error){
      return Promise.reject(error);
    }
  }
);

// An async action to get all previously booked tickets for user
export const getTickets = createAsyncThunk(
  'userService/getTickets',
  async (userId, {dispatch}) => {
    try {
      const tickets = await getUserTickets(userId);
      return tickets;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// This handle user state and actions
export const userSlice = createSlice({
  name: 'userService',
  initialState,
  reducers: {
    // sign in user action
    signIn: (state) => {

			let user = {
				id: "abc"
			};
	
			sessionStorage.setItem('user', JSON.stringify(user));

			state.details = user;
    },
    // sign out user action
    signOut: (state) => {
			
			sessionStorage.clear();

			state.details = null;
    },
    // enlist user's tickets
    addTickets: (state, action) => {
      const tickets = action.payload;
      for(const ticket of tickets){
        state.tickets.push(ticket);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userBookTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userBookTickets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tickets.push(...action.payload);
      })
      .addCase(getTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loaded = true;
        const tickets = action.payload;
        for(const ticket of tickets){
          if(!state.tickets.find(t => t.id === ticket.id)){
            state.tickets.push(ticket);
          }
        }  
      });
  },
});

export const { signIn, signOut, addTickets } = userSlice.actions;

export const selectUser = (state) => state.user.details;
export const selectUserTickets = (state) => state.user.tickets;
export const selectStatus = (state) => state.user.status;
export const selectIsLoaded = (state) => state.user.loaded;

export default userSlice.reducer;