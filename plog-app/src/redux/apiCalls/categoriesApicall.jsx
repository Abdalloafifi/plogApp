// src/redux/apiCalls/categoriesApiCall.js
import request from "../../utils/request";
import { getCategoriesSuccess , createCategory } from "../slices/categoriesSlices";
import { toast } from "react-toastify";

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const res = await request.get("/categories/all");
            dispatch(getCategoriesSuccess(res.data));
        } catch (error) {
            console.error(error);
            toast.error("Failed to load categories");
        }
    };
}
//createCategory

export function createCategoryAdmin(data) {
    return async (dispatch) => {
        try {
            const res = await request.post("/categories/categoryadmin", data);
            const newCategory = res.data;
            toast.success("Category created successfully");
            dispatch(createCategory(newCategory));
        } catch (error) {
            console.error(error);
            toast.error("Failed to create category");
        }
    };
}