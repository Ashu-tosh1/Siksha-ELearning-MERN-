import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/api/authapi";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/courseapi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/CourseProgressApi";

export const store = configureStore({
    reducer: {
        ...rootReducer,  // Spread to combine other reducers
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]:courseApi.reducer, // Add RTK Query reducer
        [purchaseApi.reducerPath]:purchaseApi.reducer,
        [courseProgressApi.reducerPath]:courseProgressApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware), // Return the middleware
});

export default store;