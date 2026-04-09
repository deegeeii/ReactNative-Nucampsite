// ─── Imports ────────────────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// ─── Async Thunk ──────────────────────────────────────────────────────────────
// fetchPartners: loads the community partners list from the server on app startup
export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const response = await fetch(baseUrl + 'partners');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

// ─── Slice ───────────────────────────────────────────────────────────────────
// Manages the partners state: loading flag, error message, and the partners array
const partnersSlice = createSlice({
    name: 'partners',
    initialState: { isLoading: true, errMess: null, partnersArray: [] },
    reducers: {}, // No synchronous reducers needed — data only comes from the server

    // ── Extra reducers for async fetch lifecycle ──
    extraReducers: (builder) => {
        builder
            // While the fetch is in-flight, mark as loading
            .addCase(fetchPartners.pending, (state) => {
                state.isLoading = true;
            })
            // On success, replace the array with the fetched data
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.partnersArray = action.payload;
            })
            // On failure, store the error message for display
            .addCase(fetchPartners.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

// ─── Reducer Export ──────────────────────────────────────────────────────────
export const partnersReducer = partnersSlice.reducer;
