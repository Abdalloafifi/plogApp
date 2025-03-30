import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlices";
import { postsActions } from "../slices/postsSlices";
import { commentsSliceActions } from "../slices/commentSlice";




export function loginUser(user) {
    return async (dispatch) => {
        try {
            const res = await request.post('/auth/login', user);
            // or
            // const res = await axios.post('http://localhost:3000/api/auth/login', user);

            // تمرير بيانات المستخدم الموجودة في res.data داخل خاصية user
            dispatch(authActions.login( res.data ));
            localStorage.setItem('user', JSON.stringify(res.data));

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }
}

export function registerUser(user) {
    return async (dispatch) => {
        try {
            const res = await request.post('/auth/register', user);
            // or
            // const res = await axios.post('http://localhost:3000/api/auth/register', user);

            // تمرير بيانات المستخدم الموجودة في res.data داخل خاصية user
            dispatch(authActions.register( res.data ));
            localStorage.setItem('user', JSON.stringify(res.data));

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }
}

export function getUser() {
    return async (dispatch) => {
        try {
            const res = await request.get('/auth/viledLogin');
            // or
            // const res = await axios.get('http://localhost:3000/api/users/profile');

            // تمرير بيانات المستخدم الموجودة في res.data داخل خاصية user
            dispatch(authActions.viledLogin(res.data ));
            localStorage.setItem('user', JSON.stringify(res.data));

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }
}

export function logoutUser() {
    return async (dispatch) => {
        await dispatch(authActions.logout());
        await dispatch(profileActions.deleteProfile());
        await dispatch(postsActions.logOutPosts());
        await dispatch(commentsSliceActions.logOutComments());

        localStorage.removeItem('user');
        //delete cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
    }
}
