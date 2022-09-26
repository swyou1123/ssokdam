import axios from "axios";
import { SERVER_URL } from "../config";

export default async function FetchFindId(userInput) {
  const URL = `${SERVER_URL}/login/findId`
  
  //   const data = JSON.stringify({
  //     userName: userInput.userName,
  //     userPhone: userInput.userPhone,
  //   });

  //   const customConfig = {
  //     headers: {
  //     'Content-Type': 'application/json'
  //     }
  // };
  
  // const response = await axios.post(URL, data, customConfig)
  
  // console.log(response);
  // response.then((res) => {
  //     console.log(res);
  // });
  const response = await fetch(URL, { 
    method: "POST",
    headers: {"Content-Type": `application/json`,},
    body: JSON.stringify({
      userName: userInput.userName,
      userPhone: userInput.userPhone,
    }),
  })
  
  const json = await response.json();
  return json
}
