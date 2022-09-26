import axios from "axios";
import { SERVER_URL } from '../config';
import { getCookieToken } from "../Cookie";


export const Api = axios.create({
  headers: {
    token : localStorage.getItem("access-token")
  },
  withCredentials: true,
  baseURL: SERVER_URL,
  timeout: 10000,
});

Api.interceptors.response.use( async (response) => {
  if (!(localStorage.getItem("access-token") === 'undefined' || getCookieToken() === 'undefined')) {
    if (Object.keys(response.data).includes('ok') && response.data.ok === '토큰만료') {
      const originalRequest = response.config
      const refreshToken = await getCookieToken();
      
      // refresh-token으로 access-token 요청
      const {data} = await axios.get(
        `${SERVER_URL}/refreshToken`,
        {
          headers: {
            token : refreshToken
          },
        }
      );
      localStorage.setItem('access-token', data.Access_token)
      console.log('토큰 만료 후 재요청');

      // 새로운 accessToken으로 재요청
      originalRequest.headers.token = localStorage.getItem("access-token")
      return Api(originalRequest)
    }
  return response}
})

export default Api;