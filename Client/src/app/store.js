import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authapi";
import { courseApi } from "@/features/api/courseapi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/CourseProgressApi";

export const store = configureStore({
    reducer: rootReducer,  // ✅ Use rootReducer directly
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            courseApi.middleware,
            purchaseApi.middleware,
            courseProgressApi.middleware
        ),
});

export default store;
