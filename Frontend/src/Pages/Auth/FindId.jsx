import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  SubLoginBackgroundView,
  MainButton,
  ButtonText,
  Wrap,
  MainText,
  HeaderWrapper,
  NotReadyToSubmitButton,
} from "../../styles/SubLoginStyles";
import { BinWrapper } from "../../styles/BackgroundStyle";
import { MuiTheme } from "../../styles/MuiTheme";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import FetchFindId from "../../api/findId";
import { InputAdornment } from '@mui/material';
import { fetchCertNum, checkCertNum } from '../../api/fetchCertNum';




const FindId = () => {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false)
  
  const [inputData, setInputData] = useState({
    userName: "",
    userPhone: "",
    userCertNum: "",
  });

  const onChangeInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  const [resData, setResData] = useState('')
  const onSubmitAccount = async () => {
    const resUserInfomation = await FetchFindId(inputData);
    if (!!Object.keys(resUserInfomation).includes("message")) {
      alert(resUserInfomation.message);
    } else {
      setResData(resUserInfomation.userId);
      handleClickOpen();
    }
  };

  const [buttonFlag, setButtonFlag] = useState(true);
  useEffect(() => {
    if (inputData.userPhone.length === 11) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  }, [inputData.userPhone])


  const [phoneToken, setPhoneToken] = useState('')
  const fetchCertificationNumber = async () => {
    const response = await fetchCertNum(inputData.userPhone)
    console.log(response)
    if (response.ok === false) {
      alert('등록되지 않은 번호입니다!')
    } else {
      setPhoneToken(response.Phone_token)
    }
  }

  
  const checkCertificationNumber = async () => {
    const response = await checkCertNum(phoneToken, inputData.userCertNum);
    if (response.ok === true) {
      setApproved(true)
      alert('인증이 완료되었습니다!');
    } else {
      alert('인증 번호가 일치하지 않습니다!');
    }
    
  }


  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
  useEffect(() => {
    if (!(Object.values(inputData).includes(''))) {
      setIsReadyToSubmit(true)
    } else {
      setIsReadyToSubmit(false)
    }
  }, [inputData])


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <Wrap>
          <HeaderWrapper>
            <BinWrapper flex="1">
              <Link to="/login">
                <ArrowBackIosIcon color="black" />
              </Link>
            </BinWrapper>
            <MainText flex="3">아이디 찾기</MainText>
            <BinWrapper flex="1"></BinWrapper>
          </HeaderWrapper>

          <TextField
            id="userName"
            label="이름"
            variant="standard"
            fullWidth
            sx={{ my: 2 }}
            color="black"
            onChange={onChangeInputData}
          />
          <TextField
            id="userPhone"
            label="휴대폰 번호"
            variant="standard"
            fullWidth
            sx={{ my: 2 }}
            color="black"
            onChange={onChangeInputData}
            InputProps={{
              endAdornment: <InputAdornment position="end">
              <Button variant="text" color={buttonFlag ? "primary" : "black"} onClick={
                (() => {
                  {buttonFlag ? fetchCertificationNumber() : null }
                })
              }>인증 요청</Button>
            </InputAdornment>
            }}
          />
          <TextField
            id="userCertNum"
            label="인증번호 입력"
            variant="standard"
            fullWidth
            sx={{ my: 2 }}
            color="black"
            onChange={onChangeInputData}
            InputProps={{
              endAdornment: <InputAdornment position="end">
              <Button variant="text" color="primary" onClick={() => checkCertificationNumber(phoneToken, inputData.userCertNum)}>인증 확인</Button>
            </InputAdornment>
            }}
          />
        </Wrap>
        {isReadyToSubmit ? (
          <MainButton width='100%' type='submit' onClick={() => onSubmitAccount(inputData)}>
            <ButtonText>아이디 찾기</ButtonText>
          </MainButton>
        ) : (
          <NotReadyToSubmitButton>
            <ButtonText>아이디 찾기</ButtonText>
          </NotReadyToSubmitButton>
        )}

<>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                아이디 찾기 결과
                <br />
              </DialogContentText>
              <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>{resData}</DialogTitle>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
                autoFocus
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </SubLoginBackgroundView>
    </ThemeProvider>
  );
};

export default FindId;
