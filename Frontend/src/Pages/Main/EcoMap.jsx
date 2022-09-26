import React from 'react';

import { MapBackGround } from '../../styles/BackgroundStyle';
import { ButtonWrapper } from '../../styles/MapStyle';

import { SERVER_URL,NONEAPI_URL } from '../../config';

import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './EcoMapModule.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../atoms';

function EcoMap() {
  const [state, setState] = useState({
    center: {
        lat : 35.18380150,
        lng : 126.79374240,
    },
    errMsg: null,
    isLoading: true,
  });
  const [positions, setPositions] = useState([]);
  console.log(positions);
  useEffect(() => {
    const fetchDevice = async () => {
      const URL = `${SERVER_URL}/embedded/map`;
      // const URL = "http://localhost:8888/positions"
      let response = await fetch(URL, {
        method: 'GET',
      }).then((res) => {
        res.json().then((res) => {
          console.log(res);
          setPositions(res);
          console.log(positions);
        });
      });
    };
    fetchDevice();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
              //   lat : 35.18380150,
              //   lng : 126.79374240,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
          console.log(state);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <MapBackGround>
        <Map // 지도를 표시할 Container
          center={state.center}
          style={{
            // 지도의 크기
            width: '100%',
            height: '100vh',
            marginBottom: -100,
            zIndex: 0,
          }}
          level={4} // 지도의 확대 레벨
        >
          {
            <MapMarker position={state.center}>
              <div style={{ margin: '5px 0 5px 0', color: '#000', width: '152px', textAlign: 'center'}}>
                "당신의 위치"
              </div>
            </MapMarker>
          }
          {positions.map((position, index) => (
            <MapMarker
              // position={position.latlng}
              position={{
                lat: `${position.embLat}`,
                lng: `${position.embLng}`,
              }}
              key={position.embId}
              image={{
                src: 'https://firebasestorage.googleapis.com/v0/b/ssokdam-e2b32.appspot.com/o/images%2Ftest%2F%EC%A7%80%EB%8F%84%EC%9E%84%ED%8B%B0.png?alt=media&token=901d2aff-752d-4d7d-84dd-7f960fa0b91d', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                },
              }}
              title={`${position.embId}번 디바이스`}
            />
          ))}
          <ButtonWrapper>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button
                size={'large'}
                style={{
                  width: '140px',
                  height: '60px',
                  backgroundColor: 'white',
                  margin: '0 8px 32px 0',
                  borderColor: 'rgba(0, 0, 0, 0.25)',
                }}
                sx={{
                  border: 1,
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  color: 'black',
                }}
                variant={'contained'}
              >
                지도 닫기
              </Button>
            </Link>
            <Link to='/qr' style={{ textDecoration: 'none' }}>
              <Button
                size={'large'}
                style={{
                  width: '140px',
                  height: '60px',
                  backgroundColor: '#CBF7FF',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.25)',
                  margin: '0 0px 32px 8px',
                  color: 'black',
                }}
                variant={'contained'}
                sx={{ borderRadius: '10px', fontWeight: 'bold' }}
              >
                사용 하기
              </Button>
            </Link>
          </ButtonWrapper>
        </Map>
      </MapBackGround>
    </>
  );
}

export default EcoMap;
