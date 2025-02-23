import { authApi } from "@/features/api/authapi";
import { courseApi } from "@/features/api/courseapi";
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, // Attach the API reducer
    [courseApi.reducerPath]:courseApi.reducer,
});

export default rootReducer;