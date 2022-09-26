import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchUseState } from '../../api/Loading';
import { BinWrapper, MainBackGround } from '../../styles/BackgroundStyle'

const Loading = () => {
  const navigate = useNavigate();
  const [embedStatus, setEmbedStatus] = useState('');

  let flag = true
  useEffect(() => {
    let count = 1
    let isCigar = setInterval(() => {
      if (flag) {
        fetchUseState().then((res) => {
          res.json().then((res) => {
            console.log(res.ok);
            if (res.ok === "Y") {
              clearInterval(isCigar)
              flag = false
              navigate('/complete');
            } 
            else if (res.ok === "N") {
              clearInterval(isCigar)
              flag = false
              navigate('/fail');
            } 
            else if (res.ok === "X") {
              clearInterval(isCigar)
              flag = false
              navigate('/fail');
            }
          });
        if (count++ === 8 && flag) {
          clearInterval(isCigar)
          navigate('/fail')
        }
        });
      }
    }, 1000);
  }, [])
 

  return (
    <MainBackGround>
      <BinWrapper mt="auto" mb="auto">
      <BinWrapper display="flex" jc="center" ai="center">
      <p style={{fontSize: "24px", fontWeight: 600}}>꽁초를 넣어주세요!</p>
        </BinWrapper>
        <img src="https://i.postimg.cc/TwRHzjp8/main-belu-min.gif" alt="loading-belu-min" style={{width: "100%"}}/>
        <BinWrapper display="flex" jc="center" ai="center">
            처리를 진행하고 있습니다!
        </BinWrapper>
      </BinWrapper>
    </MainBackGround>
  )
}

export default Loading