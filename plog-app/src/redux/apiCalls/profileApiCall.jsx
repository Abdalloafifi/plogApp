import request from "../../utils/request";
import { profileActions } from "../slices/profileSlices";
import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";

export function fetchUserProfile(userId) {
    return async (dispatch) => {
        try {
            const res = await request.get(`/users/profile/${userId}`);
            const data = res.data;
            dispatch(profileActions.getProfile(data));
            localStorage.setItem('profile', JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

//updateUserprofile
export function updateUserProfile(user) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/users/update`, user);
            console.log(res);
            const data = res.data;

            dispatch(profileActions.updateProfile(data));
            localStorage.setItem('profile', JSON.stringify(res.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

// Upload Profile Photo
export function uploadProfilePhoto(formData) {
    return async (dispatch) => {
        try {
            const res = await request.post(`/users/upload-avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const data = res.data;
            
            // تحديث حالة البروفايل والمستخدم
            dispatch(profileActions.setProfilePhoto(data));
            dispatch(authActions.setUserPhoto(data.avatar)); // تأكد من وجود هذا الإجراء
            
            // تحديث localStorage
            const updatedProfile = {...JSON.parse(localStorage.getItem('profile')), avatar: data.avatar};
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            
            // إعادة جلب البيانات للتأكد من التحديث
            dispatch(fetchUserProfile(data._id)); // أو username حسب ما يعمل
            
            toast.success("Photo updated successfully");
        } catch (error) {
            toast.error(
              error.response ? error.response.data.error : "Photo upload failed"
            );
        }
    };
}
//deleteUserprofile
export function deleteUserProfile(userId) {
    return async (dispatch) => {
        try {
            await request.delete(`/users/deleteUser/${userId}`);
            await dispatch(profileActions.deleteProfile());
            await dispatch(authActions.logout());
            localStorage.removeItem('profile');
            localStorage.removeItem('user');
            // إزالة الكوكيز إذا كانت مستخدمة
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            toast.success("User deleted successfully");
            // إعادة تحميل الصفحة لضمان حذف البيانات من الواجهة
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

//getUsersProfile
export function getUsersProfile() {
    return async (dispatch) => {
        try {
            const res = await request.get(`/users/profile`);
            const data = res.data;
            dispatch(profileActions.getProfile(data));
            localStorage.setItem('profile', JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}