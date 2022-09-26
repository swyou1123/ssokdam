import { ADMIN_SERVER_URL } from '../config';
import {SERVER_URL} from "../config";
// ----------- Main function --------

export async function fetchGeneralInfo(){
    // const URL = `${ADMIN_SERVER_URL}/;
    const URL = `${ADMIN_SERVER_URL}`
    const response = await fetch(URL, {
        method: "GET"
    })
    return response
};

// ----------- Notice function -------------------

export default async function CreateAdminNotice({ title, content, pstImg }){
    console.log(title,content,pstImg)
    const URL = `${SERVER_URL}/post`;
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            token : localStorage.getItem('access-token'),
        },
        body: JSON.stringify({
            pstTitle : title,
            pstCtnt : content,
            pstImg : pstImg,
            pstProp : "공지사항"
        }),
    })
    return response
}; // Notice Create => do

export async function fetchNotices(){
    // const URL = `${ADMIN_SERVER_URL}/exchange`;
    const URL = `${ADMIN_SERVER_URL}/notice`
    const response = await fetch(URL, {
        method: "GET"
    })
    return response
}; // Notice Read

export async function fetchNoticeUpdate({ id, pstTitle, pstCtnt, pstImg }){
    const URL = `${SERVER_URL}/post/${id}`;
    // const URL = 'http://localhost:8888/notices'
    const response = await fetch(URL, {
        method: "PUT",
        headers: {
            token : localStorage.getItem('access-token'),
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            pstTitle : pstTitle,
            pstCtnt : pstCtnt,
            pstImg : pstImg,
            pstProp : "공지사항"
        }), // 백엔드에서 생성일시 update되는 순간 최신화
    })
    return response
}; // Notice Update todo => do

export async function fetchNoticeDelete(id){
    const URL = `${SERVER_URL}/post/${id}`;
    // const URL = 'http://localhost:8888/notices'
    const response = await fetch(URL, {
        method: "DELETE",
    })
    return response
}; // Notice DELETE todo => do



// ----------------- Complain Function ------------- //
export async function fetchComplains(){
    const URL = `${ADMIN_SERVER_URL}/complain`
    let response = await fetch(URL, {
        method : 'GET',
    })
    return response
} // done

export async function fetchComplainsDetail(id){
    const URL = `${ADMIN_SERVER_URL}/complain/${id}`
    let response = await fetch(URL, {
        method : 'GET',
    })
    return response
} // done


export async function fetchBrokenDevice(){
    const URL = `${ADMIN_SERVER_URL}/broken`
    let response = await fetch(URL, {
        method : 'GET'
    })
    return response
} // done

export async function fetchBrokenDetail(id){
    const URL = `${ADMIN_SERVER_URL}/broken/${id}`
    let response = await fetch(URL, {
        method : 'GET',
    })
    return response
} // done

export async function fetchDeviceDetailStatus(id){
    const URL =`${SERVER_URL}/devices/${id}`
    let response = await fetch(URL, {
        method : 'GET'
    })
    return response
}

export async function DeleteComplain(id){
    const URL = `${SERVER_URL}/post/${id}`
    console.log(URL)
    let response = await fetch(URL, {
        method : 'DELETE',
    })
    return response
} // todo => do


export async function commentCreate({postId, cmtCtnt}){
    const URL = `${SERVER_URL}/post/${postId}/comment`
    let response = await fetch(URL, {
        method : 'POST',
        headers: {
            token : localStorage.getItem('access-token'),
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            cmtCtnt : cmtCtnt
        }),
    })
    return response
} // todo => done

export async function commentUpdate({postId,cmtId,cmtCtnt}){
    const URL = `${SERVER_URL}/post/${postId}/comment/${cmtId}`
    let response = await fetch(URL, {
        method : 'PUT',
        headers: {
            "Content-type": "application/json",
            token : localStorage.getItem('access-token'),
        },
        body: JSON.stringify({
            cmtCtnt : cmtCtnt
        }),
    })
    return response
} // todo => done


export async function commentDelete({postId, cmtId}){
    const URL = `${SERVER_URL}/post/${postId}/comment/${cmtId}`
    let response = await fetch(URL, {
        method : 'DELETE',
        })
    return response
} // todo => done
// --------------------------------------
export async function RegisterBroken(id){
    const URL = `${SERVER_URL}/devices/${id}`
    let response = await fetch(URL, {
        method : 'PUT',
        headers: {
            "Content-type": "application/json",
        },
    })
    return response
}




// ---------------------------------------------------
export async function fetchExchange(){
    // const URL = `${ADMIN_SERVER_URL}/exchange`;
    const URL = `${ADMIN_SERVER_URL}/exchange`
    const response = await fetch(URL, {
        method: "GET"
    })
    return response
}; // done

export async function AcceptExchange(id){
    const URL = `${SERVER_URL}/exchange/${id}` // id리스트로
    const response = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
    })
    return response
} // todo => ready

export async function DeleteExchange(id){
    const URL = `${SERVER_URL}/exchange/${id}` // id리스트로
    const response = await fetch(URL, {
        method: "DELETE",
    })
    return response
} // todo => ready
// ---------------------------- UserManagement ----------- //

export async function fetchUsers(){
    // const URL = `${ADMIN_SERVER_URL}/userManagement`;
    const URL = `${ADMIN_SERVER_URL}/users`
    const response = await fetch(URL, {
        method: "GET"
    })
    return response
};


export async function DeleteUser(userId){
    const URL = `${SERVER_URL}/users/${userId}` // id리스트로
    console.log(URL)
    const response = await fetch(URL, {
        method: "DELETE",
    })
    return response
} // todo => ready

