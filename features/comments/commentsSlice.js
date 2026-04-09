// ─── Imports ────────────────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// ─── Async Thunks ────────────────────────────────────────────────────────────

// fetchComments: loads all comments from the server on app startup
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
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
// Manages the comments state: loading flag, error message, and the comments array
const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },

    // ── Synchronous reducers ──
    reducers: {
        // addComment: directly pushes a new comment object into the array.
        // Called internally by the postComment thunk after the simulated delay.
        addComment: (state, action) => {
            state.commentsArray.push(action.payload);
        }
    },

    // ── Extra reducers for async fetch lifecycle ──
    extraReducers: (builder) => {
        builder
            // While the fetch is in-flight, mark as loading
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            // On success, store the returned comments array
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.commentsArray = action.payload;
            })
            // On failure, store the error message
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

// ─── Action Exports ──────────────────────────────────────────────────────────
export const { addComment } = commentsSlice.actions;

// ─── Async Thunks (continued) ────────────────────────────────────────────────

// postComment: simulates a 2-second server round-trip, then assigns a date and id
// to the new comment before dispatching addComment to update the store.
export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, { dispatch, getState }) => {
        setTimeout(() => {
            // Read current comments array length to generate a unique id
            const { comments } = getState();
            payload.date = new Date().toISOString();          // timestamp the comment
            payload.id = comments.commentsArray.length;       // next sequential id
            dispatch(addComment(payload));                    // commit to Redux state
        }, 2000);
    }
);

// ─── Reducer Export ──────────────────────────────────────────────────────────
export const commentsReducer = commentsSlice.reducer;
