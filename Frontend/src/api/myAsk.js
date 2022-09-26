import { SERVER_URL } from '../config';
import Api from './customApi';

export async function fetchMyAsk() {
  const URL = `${SERVER_URL}/myAsk`
  
  const response = await Api(URL, {
    headers: {
      token : localStorage.getItem("access-token")
    },
  })
  return response.data
}