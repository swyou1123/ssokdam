import { SERVER_URL } from "../config";
import Api from "./customApi";

export default async function FetchExchange(inputMoney) {
  const URL = `${SERVER_URL}/exchange`
  
  const data = {
    pbMoney: inputMoney,
  }

  const response = await Api.post(URL, data, {
    headers: {
      "Content-type": "application/json",
      token : localStorage.getItem("access-token")
    }
  })

  return response.data
}