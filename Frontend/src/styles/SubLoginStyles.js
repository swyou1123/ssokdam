import styled from 'styled-components';

export const SubLoginBackgroundView = styled.div `
  width: 100%;
  height: 100vh;

  background-color:${props => props.theme.colors.white};
  padding: 38px 24px 32px 24px;
  
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */	
  -moz-box-sizing: border-box; /* Firefox, other Gecko */	
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export const SubBackgroundView = styled.div `
  width: 100%;
  height: 100vh;

  background-color:${props => props.theme.colors.white};
  padding: 24px 24px 32px 24px;
  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */	
  -moz-box-sizing: border-box; /* Firefox, other Gecko */	
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PasswordWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const HeaderWrapper = styled(Wrap)`
  flex-direction: row;
  margin-bottom: ${props => props.mb};
`

export const Vector = styled.img `
  width: 10%;
  height: 100%;
`;

export const MainText = styled.p `
  flex: ${props => props.flex};
  color: ${props => props.theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
  font-family: ${props => props.theme.fonts.sCoreDream16Regular.family};
  font-size: ${props => props.theme.fonts.sCoreDream16Regular.size};
  font-weight: ${props => props.theme.fonts.sCoreDream16Regular.weight};
  line-height: ${props => props.theme.fonts.sCoreDream16Regular.lineHeight};
`;

export const MainButton = styled.button`
  width: ${props => props.width};
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.darkTurquoise};
  
  border: 0px;
  border-radius: 5px;

  @keyframes buttonAnimation {
    from {
        background-color: silver;
    }
    to {
        background-color: ${props => props.theme.colors.darkTurquoise};
    }
  }

  animation: buttonAnimation;
  animation-duration: 0.5s;

  :active {
    background-color: #80ECFF;
  }
`

export const SubButton = styled.button`
  width: ${props => props.width};
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gainsboro};
  
  margin-top: 12px;
  border: 0px;
  border-radius: 5px;

  @keyframes buttonAnimation2 {
    0% {
      width: 100%;
      height: 40px;
    }
    50% {
      width: 97%;
      height: 35px;
    }
    100% {
      width: 100%;
      height: 40px;
    }
  }

  
  :active {
    animation: buttonAnimation2;
    animation-duration: 0.25s;

    margin-left: auto;
    margin-right: auto;
    background-color: #808080;
  }
`

export const ButtonText = styled.p `
  color: ${props => props.theme.colors.black};
  text-align: center;
  font-family: ${props => props.theme.fonts.sCoreDream16Regular.family};
  font-size: ${props => props.theme.fonts.sCoreDream16Regular.size};
  font-weight: ${props => props.theme.fonts.sCoreDream16Regular.weight};
  line-height: ${props => props.theme.fonts.sCoreDream16Regular.lineHeight};
`;

export const NotReadyToSubmitButton = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gainsboro};
  
  border: 0px;
  border-radius: 5px;
`