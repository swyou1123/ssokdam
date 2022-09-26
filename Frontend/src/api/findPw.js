import axios from "axios";
import { SERVER_URL } from "../config";

export default async function FetchFindPw(userInput) {
  const URL = `${SERVER_URL}/login/findPwd`

  const response = await fetch(URL, { 
    method: "POST",
    headers: {"Content-Type": `application/json`,},
    body: JSON.stringify({
      userId: userInput.userId,
      userPhone: userInput.userPhone,
    }),
  })
  
  const json = await response.json();
  return json  
}
