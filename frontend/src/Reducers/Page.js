import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    page:{},
};

export const pageReducer = createReducer(initialState, {
    updatePageRequest: (state) => {
        state.loading = true;
    },
    updatePageSuccess: (state, action) => {
        state.loading = false;
        state.page = action.payload;
    },
    updatePageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    loadPageRequest: (state) => {
        state.loading = true;
    },
    loadPageSuccess: (state, action) => {
        state.loading = false;
        state.page = action.payload;
    },
    loadPageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    clearErrors: (state) => {
        state.error = null;
    }
});