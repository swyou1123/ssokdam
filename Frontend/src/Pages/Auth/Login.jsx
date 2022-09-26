import {React, useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { isLoginAtom, userInfo } from "../../atoms";
import { useSetRecoilState } from "recoil";

import {
  TextField,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MuiTheme } from '../../styles/MuiTheme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
  MainButton,
  SubButton,
  ButtonText,
} from "../../styles/SubLoginStyles";

import {
  ContentWrapper,
  ButtonWrapper,
  FindTextWrapper,
  MainTextWrapper,
  MainLogoText
} from "../../styles/LoginStyle";

import {
  MainBackGround,
  SubBackGround,
  BinWrapper,
} from "../../styles/BackgroundStyle";

import fetchLogin from '../../api/login'

import {setRefreshToken, getCookieToken} from '../../Cookie'

function Login() {

  // 계정
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    id: "",
    password: "",
  });
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserInfo2 = useSetRecoilState(userInfo);

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitAccount = async () => {
    try {
      const resUserInfomation = await fetchLogin(account); //성공하면 해당 user 아이디 패스워드값 셋팅
      if (!resUserInfomation.ok) {
        alert('일치하는 회원정보가 없습니다!')
      } else {
        resUserInfomation.json().then((res) => {
          console.log(res);
          if ('message' in res) {
            throw new Error(alert('비밀번호가 틀렸습니다!'))  //비동기 진행 막기
          } else {
            localStorage.setItem('access-token', res.access_token)
            setRefreshToken(res.refresh_token)
            setUserInfo2({
              userName : res.userName,
              userEmail : res.userEmail,
              userPoint : res.userPoint,
              userCnt : res.userCnt,
              userImage: res.userImg,
              userTime : res.userTime,
              userAdmin : res.userAdmin,
              notCheck : res.notCheck,
              userId : res.userId,
            })
          }
        }).then(() => {
          setIsLogin(true)
          navigate('/')
        })
      }
    } catch (error) {
      window.alert(error);  //실패하면 throw new Error("") 값 출력
    }
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <MainBackGround bgColor="#CBF7FF">
        <BinWrapper pt="52px" pl="24px">
          <Link to="/">
            <ArrowBackIosIcon color="black"/>
          </Link>
        </BinWrapper>

        <MainTextWrapper>
          <h2 style={{ fontWeight: "400", marginBottom: "10px" }}>
            아름다운 흡연 습관
          </h2>
          <MainLogoText>쏙담</MainLogoText>
        </MainTextWrapper>

        <SubBackGround height="50vh" borderRadius="20px 20px 0px 0px">
          <ContentWrapper>
            <BinWrapper>            

              <TextField
                id="id"
                label="아이디"
                fullWidth
                required
                name="id"
                variant="standard"
                autoComplete="아이디"
                autoFocus
                sx={{ my: 2 }}
                color="black"
                onChange={onChangeAccount}
              />
              <TextField
                id="password"
                label="비밀번호"
                name="password"
                type="password"
                variant="standard"
                fullWidth
                required
                autoComplete="current-password"
                sx={{ my: 2 }}
                color="black"
                onChange={onChangeAccount}
              />

              <FindTextWrapper>
                <Typography component="h3" variant="body1">
                  <Link to={"/login/findId"} style={{textDecoration: "none", color: "#000"}}>
                    아이디 찾기&nbsp;
                  </Link>
                  |
                  <Link to={"/login/findPw"} style={{textDecoration: "none", color: "#000"}}>
                  &nbsp;비밀번호 찾기
                  </Link>
                </Typography>
              </FindTextWrapper>
            </BinWrapper>


            <ButtonWrapper>
              <MainButton 
                onClick={onSubmitAccount}
              >
                <ButtonText>로그인</ButtonText>
              </MainButton>
              <SubButton onClick={() => navigate('/signup1')}>
                <ButtonText>
                    회원가입
                </ButtonText>
              </SubButton>
            </ButtonWrapper>

          </ContentWrapper>
        </SubBackGround>
      </MainBackGround>
    </ThemeProvider>
  );
}

export default Login;
