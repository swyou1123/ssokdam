import {Link, useNavigate} from 'react-router-dom'

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



const FrequentlyQuestion = () => {
  const navigate = useNavigate()
  return (
    <SubBackgroundView>
       <Wrap>
        <HeaderWrapper mb="48px">
            <BinWrapper flex="1">
                <Link to="/serviceInfo">
                    <ArrowBackIosIcon color="black"/>
                </Link>
            </BinWrapper>
            <MainText flex="3">자주 묻는 질문</MainText>
            <BinWrapper flex="1"></BinWrapper>
        </HeaderWrapper>
      </Wrap>

        <TitleWrapper>
        <ContentDivider/>
            <ContentWrapper onClick={() => navigate('/')}>
                <ContentText>1. 인증 번호가 문자가 오지 않습니다.</ContentText>
                    <ContentVector
                        alt=""
                        src="https://static.overlay-tech.com/assets/8baf2001-760e-444e-9536-318352b328b5.svg"
                    />
            </ContentWrapper>
            <ContentDivider />
        </TitleWrapper>
    </SubBackgroundView>
);  
}

export default FrequentlyQuestion