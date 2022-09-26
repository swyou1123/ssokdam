import React from 'react'
import { Link } from 'react-router-dom'

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

import { MuiTheme } from '../../styles/MuiTheme';


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider } from '@mui/material';
import HorizontalLinearStepper from '../Admin/components/Stepper';


const ServiceIntroduction = () => {
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
      
      <HorizontalLinearStepper></HorizontalLinearStepper>
      </SubBackgroundView>
    </ThemeProvider>
  )
}

export default ServiceIntroduction