import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/api/authapi";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/courseapi";

export const store = configureStore({
    reducer: {
        ...rootReducer,  // Spread to combine other reducers
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]:courseApi.reducer, // Add RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware), // Return the middleware
});

export default store;