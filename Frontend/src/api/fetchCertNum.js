import { SERVER_URL } from "../config";
import Api from "./customApi";

export async function fetchCertNum(userPhone) {
  const URL = `${SERVER_URL}/login/phone`
  
  const data = {
    userPhone: userPhone
  }
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  const json = await response.json()
  return json
}

export async function checkCertNum(phoneToken, userCertNum) {
  const URL = `${SERVER_URL}/login/phone/${userCertNum}`
  const response = await fetch(URL, {
    headers: {
      token: phoneToken
    }
  })
  const json = response.json()
  return json
}