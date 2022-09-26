import { SERVER_URL } from '../config';

// Axios vs fetch
export default async function FetchLogin({ id, password }){

  const URL = `${SERVER_URL}/login`

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userId: id,
      userPwd: password,
    }),
  })
    console.log(response);
    return response
};




// export async function fetchLogin({ id, password }) {
//   const URL = 'http://localhost:8080/api/login'
//   await fetch(URL, {
//   // await axios('/login', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       userId: id,
//       userPwd: password
//     })
//   })

//   // response.then? or response 지우기
//   .then((res) => res.json()
//     .then((res) => {
//       // 로그인 상태임을 확인 isLogin == True로 변경 => 
//       // 쿠키에 토큰 만료시 isLogin == False로 변경

//       console.log(res);
//       localStorage.setItem('access-token', res);
//       // const { accessToken } = res;
//       // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     }))
// }