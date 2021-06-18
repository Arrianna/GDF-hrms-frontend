import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { isLoading: true },
    reducers: {
        toggle(state) {
            state.isLoading = !state.isLoading;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;