import {Link, Navigate, useNavigate} from 'react-router-dom'
import { MuiTheme } from '../../styles/MuiTheme';

import {SubBackgroundView, Wrap, MainText, HeaderWrapper} from '../../styles/SubLoginStyles';
import {
    TitleWrapper,
    TitleText,
    TitleDivider,
    ContentDivider,
    ContentWrapper,
    ContentText,
    ContentVector
} from '../../styles/TitleStyle'
import {BinWrapper} from "../../styles/BackgroundStyle";
import { SubInnerText } from "../../styles/MyPageStyle"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {userInfo} from '../../atoms'
import {useRecoilState} from 'recoil'
import fetchUserInfo from '../../api/fetchUserInfo';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from "react";
import {CreateComplaint} from "../../api/complaint";
import {ChangeProfileImage} from "../../api/mypage";
import {storage} from "../../firebase";
import {IconButton} from "@mui/material";
export const MyPage = () => {
    const navigate = useNavigate()
    const [fetchedUserInfo, setFetchedUserInfo] = useState()
    const [userInfo2, setUserInfo2] = useRecoilState(userInfo)
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: `${userInfo2.userImage}`,
    });
    const [imageUrl, setImageUrl] = useState("");
    let inputRef;

    useEffect(()=> {
        // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
        return () => {
            URL.revokeObjectURL(image.preview_URL)
        }
    }, [])

    const saveImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]) {
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setImage(() => (
                {
                    image_file: e.target.files[0],
                    preview_URL: preview_URL
                }
            ))
            console.log(image)
            const storageRef = storage.ref("images/test/")
            const imagesRef = storageRef.child(e.target.files[0].name)
            const upLoadTask = imagesRef.put(e.target.files[0]);
            upLoadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("snapshot", snapshot);
                    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(percent + "% done");
                },
                (error) => {
                    console.log("err", error);
                },
                () => {
                    upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setImageUrl(downloadURL);
                        const res = ChangeProfileImage(downloadURL)
                            .then((res) => {
                                console.log(res)
                            })
                    });
                }
            )
        }}

    useEffect(() => {
      const response = fetchUserInfo()
      response.then((res) => {
        const newObject = {
          ...userInfo2,
          userPoint: res.userPoint,
          userCnt: res.userCnt,
          userTime: res.userTime,
          userImage: res.userImg,
          notCheck : res.notCheck
        }
        setUserInfo2(newObject)
      })
    }, [])

    return (<ThemeProvider theme={MuiTheme}> {
        (localStorage.getItem('access-token') !== 'undefined' && localStorage.getItem('access-token') !== null)
            ? (
                <SubBackgroundView>
                    <Wrap>
                        <HeaderWrapper mb="48px">
                            <BinWrapper flex="1">
                                <Link to="/">
                                    <ArrowBackIosIcon color="black"/>
                                </Link>
                            </BinWrapper>
                            <MainText flex="3">마이 페이지</MainText>
                            <BinWrapper flex="1"></BinWrapper>
                        </HeaderWrapper>
                    </Wrap>
                    <TitleWrapper>
                    <ContentDivider/>
                        <ContentWrapper>
                            <ContentText>이미지</ContentText>
                            {/*<SubInnerText>{userInfo2.userImage}</SubInnerText>*/}
                            <IconButton
                                color='black'
                                aria-label='upload picture'
                                component='label'
                                >
                                <Avatar alt="Remy Sharp" src={image.preview_URL} />
                                <input
                                    hidden
                                    accept='image/*'
                                    type='file'
                                    onChange={saveImage}
                                    onClick={(e) => e.target.value = null}
                                    ref={refParam => inputRef = refParam}
                                    // style={{display: "none"}}
                                />
                            </IconButton>
                        <ContentVector
                            alt=""
                            src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg">
                        </ContentVector>
                    </ContentWrapper>
                    <ContentDivider/>

                    <ContentWrapper>
                        <ContentText>이름</ContentText>
                    <SubInnerText>{userInfo2.userName}</SubInnerText>
                </ContentWrapper>
                <ContentDivider/>

                <ContentWrapper onClick={() => navigate('/login/changePw')}>
                    <ContentText>비밀번호</ContentText>
                    <SubInnerText>비밀번호 변경</SubInnerText>
                    <ContentVector
                        alt=""
                        src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"/>
                </ContentWrapper>
                <ContentDivider/>
            </TitleWrapper>

            <TitleWrapper>
                <ContentDivider/>
                <ContentWrapper onClick={() => navigate('/exchange')}>
                    <ContentText>포인트</ContentText>
                    <SubInnerText>{userInfo2.userPoint}</SubInnerText>
                    <ContentVector
                        alt=""
                        src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"/>
                </ContentWrapper>
                <ContentDivider/>

                <ContentWrapper>
                    <ContentText>바다를 지킨 횟수</ContentText>
                    <SubInnerText>{userInfo2.userCnt}</SubInnerText>
                </ContentWrapper>
                <ContentDivider/>
            </TitleWrapper>
        </SubBackgroundView>
            )
            : (<Navigate to="/login"/>)
    }</ThemeProvider>
    );  
  }
  
  export default MyPage;