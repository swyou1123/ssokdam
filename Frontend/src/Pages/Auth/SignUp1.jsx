import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  SubLoginBackgroundView,
  MainButton,
  SubButton,
  ButtonText,
  MainText,
  HeaderWrapper,
  NotReadyToSubmitButton,
} from '../../styles/SubLoginStyles';
import { BinWrapper } from '../../styles/BackgroundStyle';
import { MuiTheme } from '../../styles/MuiTheme';

import AccountCheck from '../../api/signup';

import { Button, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider } from '@mui/material/styles';
import {useRecoilState} from "recoil";
import {fetchAccountCerti} from "../../api/signup";


const SignUp1 = () => {
  const queryString = require('query-string');
  const navigate = useNavigate()

  const isActiveDefault = [true, true, true, true, true, true]
  const [isActive, setIsActive] = useState([true, true, true, true, true, true])
  const handleClick = (index) => {
    const tmp = [...isActiveDefault]
    tmp[index] = !tmp[index]
    setIsActive(tmp);
  };

  const [datas, setDatas] = useState({})
  const [impUid, setImpUid] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankNumber, setBankNumber] = useState('');

  const banks1 = [
    ['국민은행', '004'],
    ['기업은행', '003'],
    ['신한은행', '088'],
  ];
  const banks2 = [
    ['농협은행', '011'],
    ['카카오뱅크', '090'],
    ['광주은행', '034'],
  ];

  function onClickCertification() {
    const { IMP } = window; // 생략 가능
    IMP.init('imp01330466'); // 예: imp0000000
    // 본인인증 데이터 정의
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      popup: true,
      company: 'Ecowon', // 회사명 또는 URL
      carrier: 'SKT', // 통신사
      name: '홍길동', // 이름
      phone: '01012341234', // 전화번호
    }; // 별로 의미는 없는 data(공식문서에 적어져있어서 넣어놓긴했음)

    IMP.certification(data, callback);
    function callback(response) {
      console.log(response);
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        const { imp_uid } = response;

        const fetchCertification = async () => {
          const url = `${SERVER_URL}/signup/check`;
          await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ imp_uid: `${imp_uid}` }),
          }).then((res) => {
            console.log(res);
            if (!res.ok) {
              alert('성인이 아닙니다!');
            }
          });
        };
        fetchCertification();

        setImpUid(imp_uid); // 아임포트 성인인증이 되면 imp_uid를 ImpUid에 저장
        console.log(imp_uid);
      } else {
        alert(`본인인증 실패: ${error_msg}`);
      }
    }
  }

  const onChangeHandle = (e) => {
    setAccountNumber(e.target.value);
  };

  const [isAccount, setIsAccount] = useState(false);
  async function checkBankHolder(accessToken, { bankCode, bankAccountNumber }) {
    // get 요청이므로 querystring으로 넘겨준다.
    const query = queryString.stringify({
      bank_code: bankCode,
      bank_num: bankAccountNumber,
      // token : accessToken
    });

    return axios
      .get(`https://api.iamport.kr/vbanks/holder?${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 요청이므로 헤더에 토큰을 넘겨준다.
        },
      })
      .then((res) =>
        AccountCheck({
          userName: res.data.response.bank_holder,
          impUid: impUid,
        }).then((res) =>
          res.json().then((res) => {
            if (res.ok) {
              alert('계좌인증이 되었습니다!');
              setIsAccount(true);
            } else {
              alert('계좌정보가 맞지 않습니다.')
            }
          })
        )
      )
      .catch((error) => {
        /**
         * handling iamport error
         */
        const clientErrors = [400, 404];

        // 400, 404 에러는 유저가 값을 누락한 경우이므로 다른 에러 클래스로 처리한다.
        if (clientErrors.includes(error.response.status)) {
          alert('계좌정보가 맞지 않습니다.');
          throw new Error(error.response.data.message, 400);
        }
        throw new Error('iamport api 에러');
      });
  }

  const bankAccept = () => {
    if (!impUid) {
      alert('성인인증을 먼저 해주세요!');
    } else {
      // axios({
      //   url: 'https://api.iamport.kr/users/getToken',
      //   method: 'post', // POST method
      //   headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      //   withCredentials: true,
      //   data: {
      //     imp_key: '8270742312861075', // REST API키
      //     imp_secret:
      //       'dAjR0eNuEcBlF2m3jpbVAwgBg9A80aOR85pyfLpweaRqnpnynReBHOM4jTp2lvJb7Vh3XhzZOc1tjoo4', // REST API Secret
      //   },
      // }) // token받아옴
      //   .then((res) => {
      //     checkBankHolder(res.data.response.access_token, {
      //       bankCode: bankNumber,
      //       bankAccountNumber: accountNumber,
      //     });
      //   });
      fetchAccountCerti({ impUid : impUid, accountNumber : accountNumber, bankNumber : bankNumber  })
          .then((res) => {res.json().then((res) => {
            console.log(res)
            if (res.ok) {
              alert('계좌인증이 되었습니다!');
              setIsAccount(true);
            } else {
              alert('계좌정보가 맞지 않습니다.')
            }
          })})

    }
  };

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  useEffect(() => {
    console.log(impUid)
    console.log(isAccount)
    if (!!impUid && isAccount) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [isAccount, impUid]);

  useEffect(() => {
    setDatas({
      impUid: impUid,
      accountNumber: accountNumber, 
      bankNumber: bankNumber, 
    })
    console.log(datas);
  }, [impUid, accountNumber, bankNumber])

  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <HeaderWrapper>
          <BinWrapper flex='1'>
            <Link to='/login'>
              <ArrowBackIosIcon color='black' />
            </Link>
          </BinWrapper>
          <MainText flex='3'>회원가입 ( 1 / 2 )</MainText>
          <BinWrapper flex='1'></BinWrapper>
        </HeaderWrapper>

        {!!impUid ? (
          <MainButton width='100%'>
            <ButtonText>성인 인증 완료</ButtonText>
          </MainButton>
        ) : (
          <SubButton width='100%' onClick={onClickCertification}>
            <ButtonText>성인 인증 요청</ButtonText>
          </SubButton>
        )}

        <BinWrapper>
          <BinWrapper display='flex' jc='center' ai='center'>
            {banks1.map((bank, index) => (
              <Button
                key={index}
                style={{
                  backgroundColor: isActive[index] ? 'gainsboro' : '#CBF7FF',
                  color: 'black',
                }}
                variant='contained'
                onClick={() => {
                  setBankNumber(bank[1]);
                  handleClick(index);
                }}
                sx={{ flex: 1, m: 0.5 }}
              >
                {bank[0]}
              </Button>
            ))}
          </BinWrapper>

          <BinWrapper display='flex' jc='center' ai='center' mb='24px'>
            {banks2.map((bank, index) => (
              <Button
                key={index + 3}
                style={{
                  backgroundColor: isActive[index + 3]
                    ? 'gainsboro'
                    : '#CBF7FF',
                  color: 'black',
                }}
                variant='contained'
                onClick={() => {
                  setBankNumber(bank[1]);
                  handleClick(index + 3);
                }}
                sx={{ flex: 1, m: 0.5 }}
              >
                {bank[0]}
              </Button>
            ))}
          </BinWrapper>

          <TextField
            id='accountNumber'
            label='계좌번호'
            onChange={onChangeHandle}
            variant='standard'
            fullWidth
            color='black'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {/* buttonFlag ? "primary" :  */}
                  <Button
                    variant='text'
                    color={'black'}
                    onClick={() => {
                      bankAccept();
                    }}
                  >
                    인증 요청
                  </Button>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </BinWrapper>

        <BinWrapper></BinWrapper>
        <BinWrapper></BinWrapper>
        <BinWrapper></BinWrapper>

        {isReadyToSubmit ? (
          <MainButton
            width='100%'
            type='submit'
            onClick={() => {
              navigate('/signUp2', { state: datas });
            }}
          >
            <ButtonText>다음 단계로</ButtonText>
          </MainButton>
        ) : (
          <NotReadyToSubmitButton>
            <ButtonText>다음 단계로</ButtonText>
          </NotReadyToSubmitButton>
        )}
      </SubLoginBackgroundView>
    </ThemeProvider>
  );
};

export default SignUp1;
