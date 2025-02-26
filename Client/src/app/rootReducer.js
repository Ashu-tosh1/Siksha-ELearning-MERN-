import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authslice";

import { authApi } from "@/features/api/authapi";
import { courseApi } from "@/features/api/courseapi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/CourseProgressApi";

const rootReducer = combineReducers({
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
});

export default rootReducer;
