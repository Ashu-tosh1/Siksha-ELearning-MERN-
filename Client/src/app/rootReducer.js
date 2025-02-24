import { authApi } from "@/features/api/authapi";
import { courseApi } from "@/features/api/courseapi";
import { courseProgressApi } from "@/features/api/CourseProgressApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, // Attach the API reducer
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
});

export default rootReducer;