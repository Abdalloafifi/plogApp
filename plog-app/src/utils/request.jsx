// ../../utils/request.js
import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true

    
});

export default request;
