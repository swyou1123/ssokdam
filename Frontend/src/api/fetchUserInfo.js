import { SERVER_URL } from "../config";
import Api from "./customApi";

export default async function fetchUserInfo() {
  const URL = `${SERVER_URL}/userinfo`
  
  const response = await Api(URL, {
    headers: {
      token : localStorage.getItem("access-token")
    },
  })

  return response.data
}

// 홈에서 쓰이는 FetchUser
export async function FetchUserInfo() {
  const URL = `${SERVER_URL}/userinfo`

  const response = await fetch(URL, {
    headers: {
      token : localStorage.getItem("access-token")
    },
  })

  return response
}