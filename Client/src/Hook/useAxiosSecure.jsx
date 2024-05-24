import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/ContextComponent";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=> {
        axiosSecure.interceptors.response.use(res=> {
            return res
        }, error => {
            console.log("error tracked in the interceptor",error.response)
            if(error.response.status === 401 || error.response.status === 403){
                console.log("log out the user")
                logOut()
                navigate("/two/login")
            }
        })
    },[logOut,navigate])


    return axiosSecure;
};

export default useAxiosSecure;














// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../Context/ContextComponent";

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:5000'
// })
// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useContext(AuthContext)

//     // request interceptor to add authorization header for every secure call to teh api
//     axiosSecure.interceptors.request.use(function (config) {
//         const token = localStorage.getItem('access-token')
//         // console.log('request stopped by interceptors', token)
//         config.headers.authorization = `Bearer ${token}`;
//         return config;
//     }, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     });


//     // intercepts 401 and 403 status
//     axiosSecure.interceptors.response.use(function (response) {
//         return response;
//     }, async (error) => {
//         const status = error.response.status;
//         // console.log('status error in the interceptor', status);
//         // for 401 or 403 logout the user and move the user to the login
//         if (status === 401 || status === 403) {
//             await logOut();
//             navigate('/two/login');
//         }
//         return Promise.reject(error);
//     })


//     return axiosSecure;
// };

// export default useAxiosSecure;