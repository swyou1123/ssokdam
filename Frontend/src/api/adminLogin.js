import { ADMIN_SERVER_URL } from '../config';
import axios from "axios";

// Axios vs fetch
export default async function FetchAdminLogin({ id, password }){
    const URL = `${ADMIN_SERVER_URL}/login`;
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
    return response
};


// export const AxiosPostLogin = ({id,password}) => {
//     const URL = `${ADMIN_SERVER_URL}/login`;
//     const data = {
//         userId: id,
//         userPwd: password,
//     }
//     axios.post(URL , data)
//         .then((response) => {
//             console.log(response)
//         })
//             .catch((error) => {
//                 console.log(error);
//             })
// }