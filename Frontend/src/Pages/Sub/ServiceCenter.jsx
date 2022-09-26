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

import { BinWrapper } from '../../styles/BackgroundStyle';
import { ThemeProvider } from '@mui/material';

const ServiceCenter = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={MuiTheme}>
      {localStorage.getItem('access-token') !== 'undefined' &&
      localStorage.getItem('access-token') !== null ? (
        <SubBackgroundView>
          <Wrap>
            <HeaderWrapper mb='48px'>
              <BinWrapper flex='1'>
                <Link to='/'>
                  <ArrowBackIosIcon color='black' />
                </Link>
              </BinWrapper>
              <MainText flex='3'>고객 센터</MainText>
              <BinWrapper flex='1'></BinWrapper>
            </HeaderWrapper>
          </Wrap>

          <TitleWrapper>
            <ContentDivider />
            <ContentWrapper onClick={() => navigate('/complaint')}>
              <ContentText>불편 사항 접수</ContentText>
              <ContentVector
                alt=''
                src='https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg'
              />
            </ContentWrapper>
            <ContentDivider />
          </TitleWrapper>

          {/* <TitleWrapper>
                <TitleText>고장 신고</TitleText>
                <TitleDivider />
                <ContentWrapper onClick={() => navigate('/brokenDeviceReport')}>
                    <ContentText>고장신고 접수</ContentText>
                        <ContentVector
                            alt=""
                            src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"
                        />
                </ContentWrapper>
                <ContentDivider />
            </TitleWrapper> */}

          <TitleWrapper>
            <ContentDivider />
            <ContentWrapper onClick={() => navigate('/myAsk')}>
              <ContentText>나의 문의 내역 보기</ContentText>
              <ContentVector
                alt=''
                src='https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg'
              />
            </ContentWrapper>
            <ContentDivider />
          </TitleWrapper>
        </SubBackgroundView>
      ) : (
        <Navigate to='/login' />
      )}
    </ThemeProvider>
  );
};

export default ServiceCenter;
