import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: ${props => props.bs};
`
export const MainTextContainerWrapper = styled.div`
  display: flex;
`
export const MainContainer = styled.div`
  display: flex;
  margin-left: ${props => props.ml};
  flex: ${props => props.flexNum};
  justify-content: ${props => props.jc};
`

export const NameText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`

export const MainText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: ${props => props.theme.fonts.sCoreDream24Bold.lineHeight};
`
export const MainIcon = styled.p`
  width: 24px;
  height: 24px;
  margin: 0px 0px 0px 16px;
`
export const MiddleText = styled.p`
  z-index: 99;
  width: 120px;
  margin: 24px auto 0px 0px;
    
  font-size: 40px;
  font-weight: 600;
  line-height: 40px;
`

// Time
export const TimeController = styled.div`
  width: 100%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
`

// Notice
export const Notice = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.white};

  border-radius: ${props => props.br};
  padding: 12px 16px 12px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${props => props.mb};

  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export const NoticeText = styled.p`
  margin: 0px;
  font-size: ${props => props.theme.fonts.sCoreDream14Regular.size};
  font-weight: ${props => props.theme.fonts.sCoreDream14Regular.weight};
`;
export const ChevronRight = styled.img`
  width: 19.29px;
  height: 18px;
`;


// SubNotice
export const SubNotice = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.white};

  padding: 12px 0px 12px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};

  font-weight: 600;

  border-right: ${props => props.borderRight};
  /* border-radius: 50px; */
  /* border: 1px solid rgba(0,0,0,0.1);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

`;

export const SubNoticeText = styled.p`
  font-size: 16px;
  margin-bottom: auto;
`


// Map and QR Button
export const QrMapButton = styled.div`
  width: 47%;
  height: 42vw;
  
  background-size: 100%;
  background-position: center;
  background-image: url(${props => props.url});  
  border-radius: 10px;
  
  display: flex;
  align-items: flex-end;
  justify-content: center;

  text-decoration: none;

  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  
`;
export const QrMapSubText = styled.p`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fonts.sCoreDream14RegularLine24.size};
  font-weight: 500;
  line-height: ${props => props.theme.fonts.sCoreDream14RegularLine24.lineHeight};

  
`;
export const QrMapMainText = styled.strong`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fonts.sCoreDream18Bold.size};
  font-weight: ${props => props.theme.fonts.sCoreDream18Bold.weight};
  line-height: ${props => props.theme.fonts.sCoreDream18Bold.lineHeight};
`;


//포인트 버튼
export const Point = styled.div`
  width: 100%;
  height: 25vw;
  border-radius: 10px;

  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;
export const PointSubText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
export const PointMainText = styled.strong`
  font-size: ${props => props.theme.fonts.sCoreDream18Bold.size};
  font-weight: ${props => props.theme.fonts.sCoreDream18Bold.weight};
  margin-bottom: 18px;
`;
export const PointImg = styled.img`
  width: 25%;
  height: 100%;
`;


// 서비스 안내 / 문의
export const Service = styled.div`
  width: 100%;
  height: 16vw;
  padding: 16px;
  background-color: ${props => props.theme.colors.white};

  border: 1px solid rgba(0,0,0,0.1);
  border-radius: ${props => props.br};

  display: flex;
/*   
  justify-content: center;
  align-items: center; */
`;
export const ServiceVector = styled.img`
  height: 28px;
`;
export const ServiceText = styled.p`
  margin: 0px;
  margin-top: auto;

  color: ${props => props.theme.colors.black};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

export const Footer = styled.p`
  margin: auto;
  line-height: 24px;
  font-size: 8px;
  font-weight: 400;
` 


export const MiddleImg = styled.img`
  height: 150px;

  @keyframes buttonAnimation3 {
    25% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(10px);
    }
    100% {

    }
  }

  animation: buttonAnimation3;
  animation-duration: 0.75s;
`