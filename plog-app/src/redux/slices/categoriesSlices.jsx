import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
    },
    reducers: {
        getCategoriesSuccess: (state, action) => {
            state.categories = action.payload;
        },
        createCategory: (state, action) => {
            state.categories.push(action.payload);
        }
    },
});

export const { getCategoriesSuccess, createCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
