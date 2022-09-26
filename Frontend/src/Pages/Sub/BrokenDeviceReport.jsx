import * as React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';

import { MuiTheme } from '../../styles/MuiTheme';

import {
  SubLoginBackgroundView,
  MainButton,
  ButtonText,
  Wrap,
  MainText,
  HeaderWrapper,
} from '../../styles/SubLoginStyles';

import { BinWrapper } from '../../styles/BackgroundStyle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['QR 코드', '기기 입구', '기기 몸통', '센서'];

const BrokenDeviceReport = () => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <Wrap>
          <HeaderWrapper>
            <BinWrapper flex='1'>
              <Link to='/serviceCenter'>
                <ArrowBackIosIcon color='black' />
              </Link>
            </BinWrapper>
            <MainText flex='3'>고장 신고 접수</MainText>
            <BinWrapper flex='1'></BinWrapper>
          </HeaderWrapper>
        </Wrap>

        <BinWrapper>
          <TextField
            name='title'
            id='title'
            label='제목'
            variant='standard'
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
            color='black'
            required
          />

          <TextField
            name='userPwd2'
            id='content'
            label='내용'
            variant='standard'
            multiline
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
            color='black'
            required
          />
        </BinWrapper>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-multiple-checkbox-label'>태그</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            variant='standard'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>복수 선택 가능</FormHelperText>
        </FormControl>

        <IconButton
          color='black'
          aria-label='upload picture'
          component='label'
          sx={{
            width: '150px',
            height: '150px',
            border: '1px solid',
            
            borderColor: 'rgba(0, 0, 0, 0.25)',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'gainsboro',
          }}
        >
          <input hidden accept='image/*' type='file' />
          <PhotoCamera />
        </IconButton>

          <MainButton width='100%'>
            <ButtonText>아이디 찾기</ButtonText>
          </MainButton>
      </SubLoginBackgroundView>
    </ThemeProvider>
  );
};

export default BrokenDeviceReport;
