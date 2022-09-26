// 안쓰면 버리기
import styled from 'styled-components';


export const InputFormView = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrap = styled.div `
  width: 100%;
  margin-bottom: 9px;
  position: relative;
`;

export const InputText = styled.p `
  color: ${props => props.theme.colors.black};
  display: flex;
  align-items: center;
  margin: 32px 0 8px;
  font-family: ${props => props.theme.fonts.sCoreDream14Regular.family};
  font-size: ${props => props.theme.fonts.sCoreDream14Regular.size};
  font-weight: ${props => props.theme.fonts.sCoreDream14Regular.weight};
  line-height: ${props => props.theme.fonts.sCoreDream14Regular.lineHeight};
`;

export const InputForm = styled.input.attrs({ required: true })`
  display: block;
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.colors.white};
  border: 0.1px solid;
  border-radius: 5px;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */	
  -moz-box-sizing: border-box; /* Firefox, other Gecko */	
  box-sizing: border-box; /* Opera/IE 8+ */
`;