import { SERVER_URL } from '../config';

export async function fetchMyPage() {
  const URL = `${SERVER_URL}/mypage/test`

  const response = await fetch(URL, {
    headers : {
      token : localStorage.getItem("access-token")
    },
  })
  
  const json = await response.json();
  return json
}

export async function ChangeProfileImage(userImage){
  const URL = `${SERVER_URL}/mypage/image`

  const response = await fetch(URL, {
    method : "PUT",
    headers : {
      "Content-type": "application/json",
      token : localStorage.getItem("access-token")
    },
    body : JSON.stringify({
        userImg : userImage
    })
  })
  return response
}