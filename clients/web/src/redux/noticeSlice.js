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
    },
    info: (state, action) => {
      state.info = action.payload;
    },
    dismissInfo: (state, action) => {
      state.info = null;
    }
  },
  
});

export const { error, dismissError, info, dismissInfo } = noticeSlice.actions;
export const selectError = (state) => state.noticeService.error;
export const selectInfo = (state) => state.noticeService.info;

export default noticeSlice.reducer;