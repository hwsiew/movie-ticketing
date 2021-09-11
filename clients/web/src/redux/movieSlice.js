import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
	fetchMovie,
	fetchMovies 
} from '../api';

// Initial State
const initialState = {
  // list of movies
  movies: [],
  // status of async action
	status: 'idle',
};

/**
 * An async action to get all movies in db
 */
export const fetchAllMovies = createAsyncThunk(
  'movieService/fetchMovies',
  async () => {
    try{
      // request all movies from remote server
      const response = await fetchMovies();
      return response;
    } catch(error){
      return Promise.reject(error);
    }
  }
);

/**
 * An async action to get a movie by id
 */
export const fetchMovieById = createAsyncThunk(
	'movieService/fetchMovie',
	async ({ movieId, refresh = false}, {getState}) => {
    try{
      // try to get movie from current state
      const movie = selectMovie(movieId)(getState());
      // request moive detail from server if movie is not found locally
      if(!movie || refresh){
        // fetchMovie will throw an error when something goes wrong
        const response = await fetchMovie(movieId);
        return response; // should be an movie object
      } else return null; // do nothing if movie requested is found locally
    } catch (error){
      return Promise.reject(error);
    }
	}
)

/**
 * This handle the states of movie(s), movie's slot & seats for a particular slot
 * A movie slot = a movie + a hall + a time 
 */
export const movieSlice = createSlice({
  name: 'movieService',
  initialState,
  reducers: {
    // Action to update seat(s) availability (to unavailable) by a list of tickets which were successfully purchased
    // list of tickets are in action.payload
    updateSeatAvailability: (state, action) => {
      const tickets = action.payload;
      for(let ticket of tickets){
        let movie = state.movies.find(m => m.id === ticket.movie.id);
        let slot  = movie.slots.find(s => s.id === ticket.slot.id);
        let seat  = slot.seats.find(s => s.id === ticket.seat.id);
        seat.availability = ticket.seat.availability;
      }
    }
  },
	extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'idle';
      })
			.addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      // action to add movie to list of movies when requested movie details from server 
			.addCase(fetchMovieById.fulfilled, (state,action) => {
				state.status = 'idle';
        if(action.payload) {
          let movie = action.payload;
          let found = state.movies.findIndex(m => m.id === movie.id);
          if(found === -1) state.movies.push(action.payload);
          else {
            state.movies.splice(found, 1);
            state.movies.push(movie);
          }
        }
			})
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const { updateSeatAvailability } = movieSlice.actions;

// to select a list of movies
export const selectMovies = (state) => state.movieService.movies;
// to select a movie by id from the list of movies
export const selectMovie  = (movieId) => (state) => state.movieService.movies.find( movie => movie.id === movieId);
// to select async state
export const selectMovieStatus = (state) => state.movieService.status;

export default movieSlice.reducer;
