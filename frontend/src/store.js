import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";
import { pageReducer } from "./Reducers/Page";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    },
});

export default store;