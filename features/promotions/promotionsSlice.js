// ─── Imports ────────────────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// ─── Async Thunk ──────────────────────────────────────────────────────────────
// fetchPromotions: loads the promotions list from the server on app startup
export const fetchPromotions = createAsyncThunk(
    'promotions/fetchPromotions',
    async () => {
        const response = await fetch(baseUrl + 'promotions');
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
// Manages the promotions state: loading flag, error message, and the promotions array
const promotionsSlice = createSlice({
    name: 'promotions',
    initialState: { isLoading: true, errMess: null, promotionsArray: [] },
    reducers: {}, // No synchronous reducers needed — data only comes from the server

    // ── Extra reducers for async fetch lifecycle ──
    extraReducers: (builder) => {
        builder
            // While the fetch is in-flight, mark as loading
            .addCase(fetchPromotions.pending, (state) => {
                state.isLoading = true;
            })
            // On success, replace the array with the fetched data
            .addCase(fetchPromotions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.promotionsArray = action.payload;
            })
            // On failure, store the error message for display
            .addCase(fetchPromotions.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

// ─── Reducer Export ──────────────────────────────────────────────────────────
export const promotionsReducer = promotionsSlice.reducer;
