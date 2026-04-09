// ─── Imports ────────────────────────────────────────────────────────────────
import { createSlice } from '@reduxjs/toolkit';

// ─── Slice ───────────────────────────────────────────────────────────────────
// Manages the favorites state: a simple array of campsite IDs the user has saved.
// No async fetching — favorites are stored locally in Redux only.
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [], // starts as an empty array

    // ── Synchronous reducers ──
    reducers: {
        // toggleFavorite: adds the campsite ID if not present, removes it if it is.
        // This gives the heart icon its toggle behaviour on CampsiteInfoScreen.
        toggleFavorite: (favorites, action) => {
            if (favorites.includes(action.payload)) {
                // Already a favorite — filter it out (remove)
                return favorites.filter(
                    (favorite) => favorite !== action.payload
                );
            } else {
                // Not yet a favorite — push it in (add)
                favorites.push(action.payload);
            }
        }
    }
});

// ─── Action & Reducer Exports ────────────────────────────────────────────────
export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
