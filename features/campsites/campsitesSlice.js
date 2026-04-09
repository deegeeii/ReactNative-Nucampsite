// ─── Imports ────────────────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// ─── Async Thunk ──────────────────────────────────────────────────────────────
// fetchCampsites: loads the full campsite list from the server on app startup
export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseUrl + 'campsites');
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
// Manages the campsites state: loading flag, error message, and the campsites array
const campsitesSlice = createSlice({
    name: 'campsites',
    initialState: { isLoading: true, errMess: null, campsitesArray: [] },
    reducers: {}, // No synchronous reducers needed — data only comes from the server

    // ── Extra reducers for async fetch lifecycle ──
    extraReducers: (builder) => {
        builder
            // While the fetch is in-flight, mark as loading
            .addCase(fetchCampsites.pending, (state) => {
                state.isLoading = true;
            })
            // On success, replace the array with the fetched data
            .addCase(fetchCampsites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.campsitesArray = action.payload;
            })
            // On failure, store the error message for display
            .addCase(fetchCampsites.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

// ─── Reducer Export ──────────────────────────────────────────────────────────
export const campsitesReducer = campsitesSlice.reducer;
