import styled from 'styled-components';




export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  margin-bottom: 32px;
`;
export const TitleText  = styled.p`
color: ${props => props.theme.colors.black};
margin-bottom: 4px;
font-family: ${props => props.theme.fonts.sCoreDream16Bold.family};
font-size: ${props => props.theme.fonts.sCoreDream16Bold.size};
font-weight: ${props => props.theme.fonts.sCoreDream16Bold.weight};
line-height: ${props => props.theme.fonts.sCoreDream16Bold.lineHeight};
`;

export const TitleDivider = styled.hr`
    width: 100%;
    border: 0;
    height: 2px;
    background: #000;
`

export const ContentDivider = styled.hr`
    width: 100%;
    border: 0;
    height: 1px;
    background: #ddd;
`

export const ContentWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: flex-start;
`;
export const ContentText = styled.p`
width: 62.1%;
color: ${props => props.theme.colors.black};
align-self: stretch;
margin-right: 123px;
font-family: ${props => props.theme.fonts.sCoreDream14Light.family};
font-size: ${props => props.theme.fonts.sCoreDream14Light.size};
font-weight: ${props => props.theme.fonts.sCoreDream14Light.weight};
line-height: ${props => props.theme.fonts.sCoreDream14Light.lineHeight};
`;
export const ContentVector = styled.img`
width: 2.5%;
height: 82.35%;
margin-top: 2px;
`;
