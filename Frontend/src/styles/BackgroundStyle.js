import styled from "styled-components";

export const MainBackGround = styled.div`
  background-color: ${props => props.bgColor};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;


  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export const TopBackGround = styled.div`
  background-color: ${(props) => props.theme.colors.darkTurquoise};
  width: 100%;
  height: 243px;
  border-radius: 0px 0px 20px 20px;
  z-index: 10;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: flex;
  flex-direction: column;
  justify-items: center;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`

export const SubBackGround = styled.div`
  background-color: ${(props) => props.theme.colors.white};

  width: 100%;
  height: 100%;

  padding: 32px 0 24px 0;

  border-radius: ${props => props.borderRadius};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BinWrapper = styled.div`
  flex: ${props => props.flex};

  width: 100%;
  height: ${props => props.height};
  padding-top: ${props => props.pt};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-right: ${props => props.mr};
  margin-left: ${props => props.ml};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
  background-color: ${props => props.bgColor};

  border-color: silver;
  border: 1px ;
  border-right: ${props => props.borderRight};
  border-width: 50%;

  display: ${props => props.display};
  flex-direction: ${props => props.fd};
  justify-content: ${props => props.jc};
  align-items: ${props => props.ai};

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

`

export const QrBackGround = styled.div`
  background-color: #000;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`

export const MapBackGround = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`

export const MiddleBackground = styled.div`
  position: absolute;
  top: 130px;
  left: 0px;
  z-index: 0;
  object-fit: contain;
  animation: motion 1.5s linear 0s infinite alternate; margin-top: 0;

  @keyframes motion {
	0% {margin-top: 0px;}
	100% {margin-top: 15px;}
}
`