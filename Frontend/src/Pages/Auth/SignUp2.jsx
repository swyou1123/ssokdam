import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { SERVER_URL } from '../../config';
import { userInfo } from '../../atoms';

import * as Yup from 'yup';
import { Formik } from 'formik';



import {
  SubLoginBackgroundView,
  MainButton,
  SubButton,
  ButtonText,
  Wrap,
  MainText,
  HeaderWrapper,
  ButtonWrapper2,
  NotReadyToSubmitButton,
} from '../../styles/SubLoginStyles';
import { BinWrapper } from '../../styles/BackgroundStyle';
import { MuiTheme } from '../../styles/MuiTheme';
import {SignUpData} from "../../atoms";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider } from '@mui/material/styles';


// props => imp_uid & accountNumber
function SignUp2() {
  const { state } = useLocation();
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [userInfo2, setUserInfo2] = useRecoilState(userInfo);
  

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    userEmail: Yup.string() 
      .email('올바른 이메일 형식이 아닙니다!')
      .required(''),
    userId: Yup.string()
      .min(2, '닉네임은 최소 2글자 이상입니다!')
      .max(10, '닉네임은 최대 10글자입니다!')
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        '닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!'
      )
      .required(''),
    userPwd: Yup.string()
      .min(8, '비밀번호는 최소 8자리 이상입니다')
      .max(16, '비밀번호는 최대 16자리입니다!')
      .required('')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        '알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!'
      ),
    userPwd2: Yup.string()
      .oneOf([Yup.ref('userPwd'), null], '비밀번호가 일치하지 않습니다!')
      .required(''),
  });

  const submit = async (values) => {
    const { userEmail, userId, userPwd } = values;

    const fetchsubmit = async () => {
      const URL = `${SERVER_URL}/signup`;
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          userId: userId,
          userPwd: userPwd,
          imp_uid: `${state.impUid}`,
          userAccount: `${state.accountNumber}`,
          userBanknumber: `${state.bankNumber}`,
        }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((res) => {
              if (Object.keys(res).includes('message')) {
                console.log(res.message.message)
                alert(res.message.message)
              } else {                
                localStorage.setItem('access-token', res.Access_token);
                setUserInfo2({
                  userName: res.userName,
                  userEmail: res.userEmail,
                  userPoint: res.userPoint,
                  userCnt: res.userCnt,
                  userImage: res.userImg,
                  userTime : res.userTime,
                  userAdmin : res.userAdmin,
                });
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              }
            });
          } else {
            alert('성인이 아니거나 성인인증을 하지 않으셨습니다.');
          }
        })
        .catch((e) => alert('서버와의 통신이 원활하지 않습니다.'));
    };
    fetchsubmit();
  };



  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <Wrap>
          <HeaderWrapper>
            <BinWrapper flex='1'>
              <Link to='/login'>
                <ArrowBackIosIcon color='black' />
              </Link>
            </BinWrapper>
            <MainText flex='3'>회원가입 ( 2 / 2 )</MainText>
            <BinWrapper flex='1'></BinWrapper>
          </HeaderWrapper>
        </Wrap>


        <Formik
            initialValues={{
              userEmail: '',
              userId: '',
              userPwd: '',
              userPwd2: '',
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnMount={true}
            style={{display: "flex"}}
          >
            {(
              { values, handleSubmit, handleChange, errors } // console.log(values)
            ) => (
              <Box style={{width: "100%", height: "100%"}}>
                <form onSubmit={handleSubmit} autoComplete='off' style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                  <Box>
                    <TextField
                      value={values.userId}
                      name='userId'
                      onChange={handleChange}
                      error={!!errors.userId}
                      helperText={!!errors.userId ? errors.userId : ' '}
                      id='id'
                      label='아이디'
                      variant='standard'
                      fullWidth
                      sx={{
                        my: 4,
                      }}
                      color='black'
                    />

                    <TextField
                      value={values.userPwd}
                      name='userPwd'
                      type='password'
                      onChange={handleChange}
                      error={!!errors.userPwd}
                      helperText={!!!!errors.userPwd ? errors.userPwd : ' '}
                      id='pw'
                      label='비밀번호'
                      variant='standard'
                      fullWidth
                      color='black'
                    />

                    <TextField
                      value={values.userPwd2}
                      name='userPwd2'
                      type='password'
                      onChange={handleChange}
                      error={!!errors.userPwd2}
                      helperText={!!errors.userPwd2 ? errors.userPwd2 : ' '}
                      id='pw2'
                      label='비밀번호 확인'
                      variant='standard'
                      fullWidth
                      sx={{
                        marginBottom: '32px',
                      }}
                      color='black'
                    />

                    <TextField
                      value={values.userEmail}
                      name='userEmail'
                      onChange={handleChange}
                      type='email'
                      error={!!errors.userEmail}
                      helperText={!!errors.userEmail ? errors.userEmail : ' '}
                      id='email'
                      label='이메일'
                      variant='standard'
                      fullWidth
                      sx={{
                        marginBottom: '32px',
                      }}
                      color='black'
                    />
                  </Box>
                  <MainButton width='100%' type='submit'>
                    <ButtonText>회원 가입</ButtonText>
                  </MainButton>
                </form>
              </Box>
            )}
        </Formik>

      </SubLoginBackgroundView>
    </ThemeProvider>
  );
}

export default SignUp2;
