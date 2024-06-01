import axios from 'axios';
import {refreshAccessToken} from './services/userServices'
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../src/store/actions/userAction";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});
// Add a request interceptor
instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    // JWT PART
    // let accessToken = await getCookie('access-token')
    // console.log('access token',accessToken)
    // if (accessToken){
    //   config.headers['Authorization']=`Bearer ${accessToken}`
    // } else {
    //   console.log('expired')
    // }

    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// // Add a response interceptor
instance.interceptors.response.use(async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // JWT PART
    // let refreshToken = getCookie('refresh-token')
    // const originalConfig = error.config;
    // let res = await refreshAccessToken(refreshToken);
    // if(res.data.data.errCode===0) {
    //   let accessToken = getCookie('access-token')
    //   return instance({
    //     method: originalConfig.method, // Use the original request's method
    //     url: originalConfig.url, // Use the original request's URL
    //     data: originalConfig.data, // Optionally include the original request's data
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`
    //     }
    //   });
    // } else {
    // const dispatch = useDispatch();
    //   dispatch(setIsLogin(false));
    //   console.error("Failed to refresh access token.");
    // }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance;


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
