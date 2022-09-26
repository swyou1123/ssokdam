import styled from 'styled-components';

export const ExchangeBackground = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
`
;

;
export const PointMainText = styled.p`
margin: 0px;
height: 100%;
width: 100%;
text-align: center;
font-family: ${props => props.theme.fonts.sCoreDream28Regular.family};
font-size: ${props => props.theme.fonts.sCoreDream28Regular.size};
font-weight: 700;
line-height: ${props => props.theme.fonts.sCoreDream28Regular.lineHeight};
`
;
export const Rectangle24 = styled.img`
width: 43.24%;
height: 48.51%;
margin-left: auto;
margin-right: auto;
`
;

;
export const Num5000 = styled.p`
margin-left: auto;
margin-right: auto;
color: ${props => props.theme.colors.silver};
font-size: 12px;
font-weight: 500;
line-height: ${props => props.theme.fonts.sCoreDream10Regular.lineHeight};
`
;
export const Num5000Emphasis0 = styled.strong`
margin-left: auto;
margin-right: auto;

font-size: 20px;
font-weight: 500;
line-height: ${props => props.theme.fonts.sCoreDream14RegularLine20.lineHeight};
`
;

export const Num100 = styled.p`
margin-left: auto;
margin-right: auto;

font-size: ${props => props.theme.fonts.sCoreDream18Regular2.size};
font-weight: ${props => props.theme.fonts.sCoreDream18Regular2.weight};
line-height: ${props => props.theme.fonts.sCoreDream18Regular2.lineHeight};
`
;
