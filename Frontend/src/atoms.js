import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const IsComplain = atom({
  key: "isComplain",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const ComplainDevice =  atom({
  key: "ComplainDevice",
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export const userInfo = atom({
  key : 'userInfo',
  default : {
    userName : '',
    userEmail : '',
    userPoint : '',
    userCnt : '',
    userImage: '',
    userTime : '',
    userAdmin : '',
    notCheck : '',
    userId : '',
  },
  effects_UNSTABLE: [persistAtom],
})

export const ComplaintStatus = atom({
  key : 'complainStatus',
  default : "",
  effects_UNSTABLE: [persistAtom],
})

export const Mode = atom({
  key : 'mode',
  default : "관리자 메인",
  effects_UNSTABLE: [persistAtom],
})

export const Status = atom({
  key : 'GENERAL',
  default : "GENERAL",
  effects_UNSTABLE: [persistAtom],
})

export const NoticeDetail = atom({
  key : 'noticeDetail',
  default : {
    userId : "",
    pstSeq : "",
    pstTitle : "",
    pstCtnt : "",
    pstDt : "",
    pstImg : ""
  },
  effects_UNSTABLE: [persistAtom],
})

export const PostDetail = atom({
  key : 'postDetail',
  default : {
    userId : "",
    pstSeq : "",
    pstTitle : "",
    pstCtnt : "",
    pstDt : "",
    file : ""
  },
  effects_UNSTABLE: [persistAtom],
  // 나중에 comment도 와야함
})
