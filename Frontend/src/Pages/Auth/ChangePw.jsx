import {
  SubLoginBackgroundView,
  MainButton,
  ButtonText,
  Wrap,
  Vector,
  MainText,
  HeaderWrapper,
  NotReadyToSubmitButton,

} from '../../styles/SubLoginStyles';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BinWrapper } from '../../styles/BackgroundStyle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MuiTheme } from '../../styles/MuiTheme';
import { useState, useEffect, useCallback } from 'react';
import ChangePwd from '../../api/changePw';



const FindPassword = () => {
  const navigate = useNavigate()
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const { state } = useLocation();

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  
  useEffect(() => {
    if (!!password && !!passwordConfirm) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [isPassword, isPasswordConfirm]);

  const onSubmitAccount = async () => {
    const response = await ChangePwd(password, state);
    if (response.ok === true) {
      alert('비밀번호 변경에 성공했습니다!')
      navigate('/login')
    } else {
      alert('죄송합니다. 로직을 처리하던 도중에 에러가 발생했습니다. 다시 시도해주세요.')
    }
  };

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀립니다. 다시 확인해주세요')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  return (
      <ThemeProvider theme={MuiTheme}>
          <SubLoginBackgroundView>
              <Wrap>
                <HeaderWrapper>
                  <BinWrapper flex="1" onClick={() => navigate(-1)}>
                      <ArrowBackIosIcon color="black" />
                  </BinWrapper>
                  <MainText flex="3">비밀번호 변경</MainText>
                  <BinWrapper flex="1"></BinWrapper>
                </HeaderWrapper>
                  
                  <TextField id="userPwd" label="변경할 비밀번호" variant="standard" fullWidth sx={ { my:2 } } color="black" onChange={onChangePassword} 
                  error={!isPassword} 
                  helperText={!isPassword ? passwordMessage : ' '}
                  />
                  <TextField id="userPwd2" label="비밀번호 확인" variant="standard" fullWidth sx={ { my:2 } } color="black" onChange={onChangePasswordConfirm} 
                  error={!isPasswordConfirm}
                  helperText={!isPasswordConfirm ? passwordConfirmMessage : ' '}
                  />
              </Wrap>
              {isReadyToSubmit ? (
                <MainButton
                  width="100%"
                  type="submit"
                  onClick={() => {
                    onSubmitAccount()
                  }}
                >
                  <ButtonText>비밀번호 변경</ButtonText>
                </MainButton>
              ) : (
                <NotReadyToSubmitButton>
                  <ButtonText>비밀번호 변경</ButtonText>
                </NotReadyToSubmitButton>
              )}
          </SubLoginBackgroundView>
      </ThemeProvider>
  );
};

export default FindPassword;