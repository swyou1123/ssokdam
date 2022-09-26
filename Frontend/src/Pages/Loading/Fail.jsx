import { ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BinWrapper, MainBackGround } from '../../styles/BackgroundStyle'
import { MuiTheme } from '../../styles/MuiTheme';
import { HeaderWrapper, SubBackgroundView, Wrap, MainText} from '../../styles/SubLoginStyles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import fetchUserInfo from "../../api/fetchUserInfo";
import {useRecoilState} from "recoil";
import {userInfo} from "../../atoms";

const Fail = () => {
  const navigate = useNavigate();
  const [userInfo2, setUserInfo2] = useRecoilState(userInfo);

  useEffect(() => {
      const response = fetchUserInfo()
      response.then((res) => {
          console.log(res)
          const newObject = {
              ...userInfo2,
              userPoint: res.userPoint,
              userCnt: res.userCnt,
              userTime: res.userTime,
              userImage: res.userImg,
              notCheck : res.notCheck,
              userAdmin : res.userAdmin
          }
          console.log(newObject)
          setUserInfo2(newObject)
      })
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);


  return (
    <ThemeProvider theme={MuiTheme}>
      <SubBackgroundView>
        <Wrap>
            <HeaderWrapper mb="48px">
                <BinWrapper flex="1">
                    <Link to="/">
                        <ArrowBackIosIcon color="black"/>
                    </Link>
                </BinWrapper>
                <MainText flex="3">수거 실패!</MainText>
                <BinWrapper flex="1"></BinWrapper>
            </HeaderWrapper>
        </Wrap>

        <BinWrapper mt="auto" mb="auto">
          <BinWrapper display="flex" jc="center" ai="center">
            <p style={{fontSize: "24px", fontWeight: 600}}>꽁초 인식을 실패했습니다!</p>
          </BinWrapper>
          <img src="https://i.postimg.cc/B67CnbTb/1.jpg" alt="loading-belu-min" style={{width: "100%"}}/>
          <BinWrapper display="flex" jc="center" ai="center">
            다시 확인해주세요
          </BinWrapper>
        </BinWrapper>
      </SubBackgroundView>
    </ThemeProvider>
  )
}

export default Fail


