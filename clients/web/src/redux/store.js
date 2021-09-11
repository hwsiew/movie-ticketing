import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import noticeSlice from './noticeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movieService: movieReducer,
    noticeService: noticeSlice
  },
});
