import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlices";
import { postsReducer } from "./slices/postsSlices";
import { commentsSliceReducer } from "./slices/commentSlice";
import categoriesReducer from "./slices/categoriesSlices"; // إضافة شريحة الكاتيجوري

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        posts: postsReducer,
        comments: commentsSliceReducer,
        categories: categoriesReducer, // تضمين الكاتيجوري هنا
    },
});

export default store;
