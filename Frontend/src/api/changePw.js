import { SERVER_URL } from "../config";
import Api from "./customApi";

export default async function ChangePwd(userPwd, userId) {
  const URL = `${SERVER_URL}/login/changePwd`
  
  const datas = {
    userId: userId,
    userPwd: userPwd,
  }

  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(datas),
  })

  return response
}