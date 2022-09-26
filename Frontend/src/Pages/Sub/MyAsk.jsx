import { useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { MuiTheme } from '../../styles/MuiTheme';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  SubBackgroundView,
  Wrap,
  MainText,
  HeaderWrapper,
} from '../../styles/SubLoginStyles';

import {
  TitleWrapper,
  TitleText,
  TitleDivider,
  ContentDivider,
  ContentWrapper,
  ContentText,
  ContentVector,
} from '../../styles/TitleStyle';

import Loading from '../Loading'

import { BinWrapper } from '../../styles/BackgroundStyle';

import { AlarmMainText, AlarmSubText } from '../../styles/AlarmStyle';
import { fetchMyAsk } from '../../api/myAsk';
import { useQuery } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';

const MyAsk = () => {
  const navigate = useNavigate();
  const { isSuccess, isLoading, data } = useQuery(
    ['myAskList'],
    async () => await fetchMyAsk()
        .then((res) =>  res.reverse((a,b) => {
          return a.pstSeq - b.pstSeq
        }))
  );

  const askList = data?.map((ask, index) => (
    <BinWrapper key={index}>
      <BinWrapper
        onClick={() => {
          navigate(`/myAsk/${ask.pstSeq}`, { state: ask });
        }}
      >
        <ContentWrapper>
          <AlarmMainText>{ask.pstTitle}</AlarmMainText>
        </ContentWrapper>
        <ContentWrapper>
          <AlarmSubText>{ask.pstDt}</AlarmSubText>
        </ContentWrapper>
      </BinWrapper>
      <ContentDivider />
    </BinWrapper>
  ));

  return (
    <ThemeProvider theme={MuiTheme}>
      {localStorage.getItem('access-token') !== 'undefined' && localStorage.getItem('access-token') !== null ? (
         isLoading ? ( <Loading></Loading>) : (
          <SubBackgroundView>
            <Wrap>
              <HeaderWrapper mb='48px'>
                <BinWrapper flex='1'>
                  <Link to='/serviceCenter'>
                    <ArrowBackIosIcon color="black" />
                  </Link>
                </BinWrapper>
                <MainText flex='3'>나의 문의 내역</MainText>
                <BinWrapper flex='1'></BinWrapper>
              </HeaderWrapper>
              <ContentDivider />
            </Wrap>
            {askList}
          </SubBackgroundView>
        )
      ) : (
        <Navigate to='/login' />
      )}
    </ThemeProvider>
  );
};
export default MyAsk;
