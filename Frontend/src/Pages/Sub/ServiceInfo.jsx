import {Link, useNavigate} from 'react-router-dom'
import Loading from '../Loading'

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
    ContentVector
} from '../../styles/TitleStyle'

import {
    BinWrapper,
} from "../../styles/BackgroundStyle";
import { ThemeProvider } from '@mui/material';



const ServiceInfo = () => {
  const navigate = useNavigate()
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
                <MainText flex="3">서비스 안내</MainText>
                <BinWrapper flex="1"></BinWrapper>
            </HeaderWrapper>
        </Wrap>

            <TitleWrapper>
            <ContentDivider/>
                <ContentWrapper onClick={() => navigate('/serviceinfo/help')}>
                    <ContentText>서비스 소개</ContentText>
                        <ContentVector
                            alt=""
                            src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"
                        />
                </ContentWrapper>
                <ContentDivider />
                {/* <ContentWrapper onClick={() => navigate('/frequentlyQuestion')}>
                    <ContentText>자주 묻는 질문</ContentText>
                        <ContentVector
                            alt=""
                            src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"
                        />
                </ContentWrapper>
                <ContentDivider /> */}
            </TitleWrapper>
        </SubBackgroundView>
    </ThemeProvider>
);  
}

export default ServiceInfo