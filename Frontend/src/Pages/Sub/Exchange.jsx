import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { MuiTheme } from '../../styles/MuiTheme';

import {
  ExchangeBackground,
  PointMainText,
  Rectangle24,
  Num5000,
  Num5000Emphasis0,
  Num100,
} from '../../styles/ExchangeStyle';

import {
  SubLoginBackgroundView,
  MainButton,
  ButtonText,
  Wrap,
  MainText,
  HeaderWrapper,
} from '../../styles/SubLoginStyles';

import { BinWrapper } from '../../styles/BackgroundStyle';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField, ThemeProvider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atoms';
import { useState } from 'react';
import { useEffect } from 'react';
import FetchExchange from '../../api/exchange';
import fetchUserInfo from '../../api/fetchUserInfo';

const Exchange = () => {
  const navigate = useNavigate();

  const [userInfo2, setUserInfo2] = useRecoilState(userInfo);
  const [userPoint, setUserPoint] = useState(userInfo2.userPoint);
  const [userInput, setUserInput] = useState(0);

  useEffect(() => {
    const response = fetchUserInfo();
    response.then((res) => {
      const newObject = {
        ...userInfo2,
        userPoint: res.userPoint,
        userCnt: res.userCnt,
        userTime: res.userTime,
      };
      setUserInfo2(newObject);
    });
  }, []);

  const onChangePoint = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmitPoint = async () => {
    if (userPoint >= userInput && userInput >= 5000 ) {
      const response = await FetchExchange(userInput);
      if (response.ok) {
        alert('전환 요청 완료!');
        navigate('/');
      } else {
        alert('포인트 전환에 실패했습니다.');
      }
    } else {
      alert('포인트가 부족하거나 5000포인트 미만으로 입력하셨습니다.');
    }
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      {localStorage.getItem('access-token') !== 'undefined' &&
      localStorage.getItem('access-token') !== null ? (
        <SubLoginBackgroundView>
          <Wrap>
            <HeaderWrapper>
              <BinWrapper flex='1' onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon color='black' />
              </BinWrapper>
              <MainText flex='3'>포인트 전환</MainText>
              <BinWrapper flex='1'></BinWrapper>
            </HeaderWrapper>
          </Wrap>

          <ExchangeBackground>
            <PointMainText>나의 포인트 {userInfo2.userPoint} P</PointMainText>
            <Rectangle24
              alt=''
              src='https://static.overlay-tech.com/assets/e2e20f2a-e20c-4c5f-9bc6-71ef706fd79e.png'
            />

            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              sx={{ marginBottom: '32px' }}
              onChange={onChangePoint}
            />
            <Num5000Emphasis0>포인트를 전환 신청 합니다</Num5000Emphasis0>
            <Num5000>최소 5000포인트 이상 시 환전 가능</Num5000>
          </ExchangeBackground>
          <BinWrapper></BinWrapper>
          <MainButton width='100%' onClick={onSubmitPoint}>
            <ButtonText>전환 신청</ButtonText>
          </MainButton>
        </SubLoginBackgroundView>
      ) : (
        <Navigate to='/login' />
      )}
    </ThemeProvider>
  );
};
export default Exchange;
