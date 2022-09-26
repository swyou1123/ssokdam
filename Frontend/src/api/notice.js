import { SERVER_URL } from '../config';

export async function fetchNotice() {
  const URL = `${SERVER_URL}/notice/id`

  const response = await fetch(URL, {
    headers : {
      "Content-Type": `application/json`,
    }
  })
  
  const json = await response.json();
  console.log(json);
  return json
}