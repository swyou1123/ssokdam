import { SERVER_URL } from '../config';
import Api from './customApi';

export async function fetchAlarm() {
  const URL = `${SERVER_URL}/alarm`

  const response = await Api(URL, {
    headers: {
      token : localStorage.getItem("access-token")
    },
  })
  response.data.reverse((a,b) => {
    return a.notSeq - b.notSeq
  })
  console.log(response.data)
  return response.data
}

// export async function AlarmReading(id){
//   const URL = `${SERVER_URL}/alarm/${id}`
//
//   const response = await fetch(URL, {
//     method : 'PUT',
//     headers : {
//       token : localStorage.getItem("access-token")
//     }
//   })
//   return response
// }