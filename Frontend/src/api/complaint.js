import { SERVER_URL } from '../config';
import Api from "./customApi";

export async function CreateComplaint(userInput) {
  const URL = `${SERVER_URL}/post`
  
  const data = {
    pstTitle: userInput.pstTitle,
    pstCtnt: userInput.pstCtnt,
    pstProp: userInput.pstType,
    pstImg: userInput.pstImg,
    pstDumy : userInput.pstDumy
  }
  const response = await Api.post(URL, data, {
    headers: {
      token : localStorage.getItem('access-token'),
      "Content-type": "application/json",
    }
  })
  
  return response.data
}