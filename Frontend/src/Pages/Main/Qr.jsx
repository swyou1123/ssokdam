import { NONEAPI_URL } from '../../config';

import Container from "@mui/material/Container";
import React, {useState} from 'react'
import {Fab, TextareaAutosize} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'
import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { userInfo } from '../../atoms'
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import { MainBackGround } from '../../styles/BackgroundStyle';
import {IsComplain} from "../../atoms";
import {ComplainDevice} from "../../atoms";

function Qr(){
    const [qrscan, setQrscan] = useState('QR을 스캔해주세요.');
    const navigate = useNavigate();
    const [userInfo2, setUserInfo2] = useRecoilState(userInfo)
    const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight])
    const [isComplain, setIsComplain] = useRecoilState(IsComplain)
    const [complainDevice, setComplainDevice] = useRecoilState(ComplainDevice)

    console.log(isComplain);
    const handleScan = data => {
        if (data && !isComplain) {
            setQrscan(data)
            // 백엔드에 URL 보내기
            const fetchQr = async () => {
                const deviceNum2 = data.split("=")[1]
                const URL = `${NONEAPI_URL}/api/embedded/qr`
                await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        embId: parseInt(deviceNum2),
                        token: localStorage.getItem('access-token')
                    })
                }).then((res) => navigate('/loading2'))
            }
            fetchQr()
            console.log(data)
        }else if( data && isComplain ){
            const deviceNum = data.split("=")[1]
            setComplainDevice(deviceNum)
            setIsComplain(false)
            history.back()
    }}
    const handleError = err => {
        console.error(err)
    }
    useEffect(() => {
        if(!localStorage.getItem('access-token')){
            alert('로그인을 해주세요.')
            navigate('/login')
        }
    },[])

    return (
            <MainBackGround>
                <Box sx={{padding:'30px', justifyContent : 'center', alignItems:'center'}}>
                    {/*<Link to='/'>*/}
                        <ArrowBackIosIcon onClick={() => {
                            setIsComplain(false)
                            history.back()
                        }} sx={{color : 'black'}}/>
                    {/*</Link>*/}
                </Box>
                <Box sx={{ display : 'flex', justifyContent : 'center', width: '100%'}}>
                    <h2>QR을 스캔해주세요.</h2>
                </Box>

                <center>
                        <QrScan
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{height: "100vh", width: "100vw" }}
                        />
                </center>

                <TextareaAutosize
                    style={{ textAlign : 'center',fontSize:18, width:320, height:100, marginTop:100}}
                    rowsMax={4}
                    defaultValue={qrscan}
                    value={qrscan}
                />
            </MainBackGround>
    )
}

export default Qr;