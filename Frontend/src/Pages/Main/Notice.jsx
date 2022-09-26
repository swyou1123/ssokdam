import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  SubLoginBackgroundView,
  Wrap,
  MainText,
  HeaderWrapper,
  MainButton,
  ButtonText,
} from '../../styles/SubLoginStyles';
import { BinWrapper } from '../../styles/BackgroundStyle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useQuery } from '@tanstack/react-query';
import { fetchNotice } from '../../api/notice';
import { MuiTheme } from '../../styles/MuiTheme';
import { ThemeProvider } from '@mui/material';
import { ContentDivider, ContentWrapper } from '../../styles/TitleStyle';
import { AlarmMainText, AlarmSubText } from '../../styles/AlarmStyle';

const Notice = () => {
  const { isSuccess, isLoading, data } = useQuery(
    ['noticeList'],
    async () => await fetchNotice()
  );
  console.log(data);

  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <Wrap>
          <HeaderWrapper>
            <BinWrapper flex='1'>
              <Link to='/'>
                <ArrowBackIosIcon color='black' />
              </Link>
            </BinWrapper>
            <MainText flex='3'>공지사항</MainText>
            <BinWrapper flex='1'></BinWrapper>
          </HeaderWrapper>

          <ContentWrapper>
            <AlarmMainText>
              {data?.pstTitle}
              <br />
            </AlarmMainText>
          </ContentWrapper>
          <ContentWrapper>
            <AlarmSubText>
              {data?.pstDt}
            </AlarmSubText>
          </ContentWrapper>
          <ContentDivider/>

          {data?.pstImg ? <img style={{ width : '100%' }} src={data?.pstImg} /> : <>{data?.pstCtnt}</>}
        </Wrap>
      </SubLoginBackgroundView>
    </ThemeProvider>
  );
};

export default Notice;
