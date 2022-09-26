import React from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { MuiTheme } from '../../styles/MuiTheme';

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
} from '../../styles/TitleStyle';

import { BinWrapper } from '../../styles/BackgroundStyle';
import { AlarmMainText, AlarmSubText } from '../../styles/AlarmStyle';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useQuery } from '@tanstack/react-query';
import { fetchMyAskDetail } from '../../api/myAskDetail';
import { ThemeProvider } from '@mui/material';

const MyAskDetail = () => {
  let { id } = useParams();
  const { state } = useLocation();
  const { isSuccess, isLoading, data } = useQuery(
    ['myAskDetail'],
    async () => await fetchMyAskDetail(id)
  );

  console.log(state);

  const commentList = data?.map((cmt, index) => (
    <BinWrapper key={index}>
      <BinWrapper>
        <ContentWrapper>
          <AlarmMainText>
            {cmt.userId} | {cmt.cmtCtnt}
          </AlarmMainText>
        </ContentWrapper>
        <ContentWrapper>
          <AlarmSubText>{state.pstDt}</AlarmSubText>
        </ContentWrapper>
      </BinWrapper>
      <ContentDivider />
    </BinWrapper>
  ));

  return (
    <ThemeProvider theme={MuiTheme}>
      {localStorage.getItem('access-token') !== 'undefined' &&
      localStorage.getItem('access-token') !== null ? (
        <SubBackgroundView>
          <Wrap>
            <HeaderWrapper mb='48px'>
              <BinWrapper flex='1'>
                <Link to='/serviceCenter'>
                  <ArrowBackIosIcon color='black' />
                </Link>
              </BinWrapper>
              <MainText flex='3'>나의 문의 내역</MainText>
              <BinWrapper flex='1'></BinWrapper>
            </HeaderWrapper>
            <TitleWrapper>
              <BinWrapper>
                <ContentWrapper>
                  <AlarmMainText>{state.pstTitle}</AlarmMainText>
                </ContentWrapper>
                <ContentWrapper>
                  <AlarmSubText>{state.pstDt}</AlarmSubText>
                </ContentWrapper>
              </BinWrapper>
              <TitleDivider />
              <BinWrapper>
                <ContentWrapper>
                  <AlarmMainText>{state.pstCtnt}</AlarmMainText>
                </ContentWrapper>
              </BinWrapper>
            </TitleWrapper>
          </Wrap>

          {state.pstImg ? (
            <img
              src={`${state.pstImg}`}
              style={{ width: 200, height: 200, margin: 'auto' }}
            />
          ) : (
            <BinWrapper pt='120px'></BinWrapper>
          )}

          <TitleWrapper>
            <TitleText>답변</TitleText>
            <TitleDivider />
            {commentList ? (
              <>{commentList}</>
            ) : (
              <>답변이 등록되지 않았습니다!</>
            )}
          </TitleWrapper>
        </SubBackgroundView>
      ) : (
        <Navigate to='/login' />
      )}
    </ThemeProvider>
  );
};
export default MyAskDetail;
