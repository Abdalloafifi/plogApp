import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null,
    },
    reducers: {
        getProfile(state, action) {
            state.profile = action.payload
        },

        //updateUserprofile
        updateProfile(state, action) {
            state.profile = action.payload.profile
        },
        //u
        setProfilePhoto(state, action) {
            state.profile.avatar = action.payload.avatar; // تحديث الصورة مباشرة
        },
        //deleteUserprofile
        deleteProfile(state) {
            state.profile = null
        }

    }

})
const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;
export { profileReducer, profileActions }