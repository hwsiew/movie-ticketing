import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
	warning: null,
	info: null
};

export const noticeSlice = createSlice({
  name: 'noticeService',
  initialState,
  reducers: {
    // set an error
    error: (state, action) => {
      state.error = action.payload;
    },
    // dismiss an error
    dismissError: (state) => {
      state.error = null;
    }
  },
  
});

export const { error, dismissError } = noticeSlice.actions;
export const selectError = (state) => state.noticeService.error;

export default noticeSlice.reducer;