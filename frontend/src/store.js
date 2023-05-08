import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";
import { pageReducer } from "./Reducers/Page";

let initialState = {
    page:{
        page: localStorage.getItem("page") ? JSON.parse(localStorage.getItem("page")) : null,
    }
};

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    },
    preloadedState: initialState,
});

export default store;