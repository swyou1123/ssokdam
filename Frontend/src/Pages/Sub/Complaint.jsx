import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

import {
  SubLoginBackgroundView,
  Wrap,
  MainText,
  HeaderWrapper,
  MainButton,
  ButtonText,
  NotReadyToSubmitButton,
} from '../../styles/SubLoginStyles';
import {UploaderWrapper, ImgWrapper} from "../../styles/AdminStyle";
import {BinWrapper} from "../../styles/BackgroundStyle";
import {MuiTheme} from "../../styles/MuiTheme"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider } from '@mui/material/styles';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import {Button, Box} from "@mui/material";
import { CreateComplaint } from '../../api/complaint';
import React from "react";
import {storage} from "../../firebase";
import CreateAdminNotice from "../../api/admin";
import {IsComplain} from "../../atoms";
import { useRecoilState } from "recoil";
import {ComplainDevice} from "../../atoms";
import {ComplaintStatus} from "../../atoms";
import Avatar from '@mui/material/Avatar';



const Complaint = () => {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
  const [complainStatus, setComplainStatus] = useRecoilState(ComplaintStatus)
  const [userInput, setUserInput] = useState({
    pstTitle: '',
    pstCtnt: '',
    pstType: complainStatus,
  });
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "https://cdn-icons-png.flaticon.com/512/6583/6583130.png",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isComplain, setIsComplain] = useRecoilState(IsComplain)
  const [complainDevice, setComplainDevice] = useRecoilState(ComplainDevice)
  const [progress, setProgress] = useState(0)
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    if(e.target.files[0]){
      // ????????? ???????????? ????????? createObjectURL()??? ?????? ????????? ?????? URL??? ??????
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => (
          {
            image_file: e.target.files[0],
            preview_URL: preview_URL
          }
      ))
    }
  }
  const deleteImage = () => {
    // createObjectURL()??? ?????? ????????? ?????? URL??? ??????
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: "",
      preview_URL: "https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png",
    });
  }
  useEffect(()=> {
    // ??????????????? ?????????????????? createObjectURL()??? ?????? ????????? ?????? URL??? ??????
    return () => {
      URL.revokeObjectURL(image.preview_URL)
    }
  }, [])

  const navigate = useNavigate()

  const handleChange = (event) => {
    if(event.target.name === 'pstType'){
      setComplainStatus(event.target.value)
    } // pstType??? ????????? status??????
    if(event.target.name === 'pstType' && event.target.value === "????????????"){
      setComplainDevice("")
      setIsComplain(false)
    } // ????????????????????? device ???????????? ??????
    setUserInput((state) => {
      return { ...state, [event.target.name]: event.target.value };
    })
  }
  const submitComplaint = async (userInput) => {
    if(!image.image_file){
        CreateComplaint({...userInput, pstImg : "", pstDumy : complainDevice})
            .then((res) => {
                console.log(res)
                setComplainDevice("")
                setIsComplain("")
                setComplainStatus("")
                if (res.ok) {
                    alert('?????? ??????')
                    navigate('/myAsk')
                } else {
                    alert('?????? ??????')
                }
            })
    }
    const storageRef = storage.ref("images/test/")
    const imagesRef = storageRef.child(image.image_file.name)
    const upLoadTask = imagesRef.put(image.image_file);
    upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
          setProgress(percent)
        },
        (error) => {
          console.log("err", error);
        },
        () => {
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
            const res = CreateComplaint({...userInput, pstImg : downloadURL, pstDumy : complainDevice})
                .then((res) => {
                  console.log(res)
                  setComplainDevice("")
                  setIsComplain("")
                  setComplainStatus("")
                  if (res.ok) {
                    alert('?????? ??????')
                    navigate('/myAsk')
                  } else {
                    alert('?????? ??????')
                  }
                })
            // CreateAdminNotice({...article, pstImg : downloadURL})
            // alert("????????? ????????? ?????????????????????!");
            // setMode("???????????? ??????")
          });
        }
    );
    // create complaint ?????? ??????
    // const res = await CreateComplaint(userInput)
    // if (res.ok) {
    //   alert('?????? ??????')
    //   navigate('/myAsk')
    // } else {
    //   alert('?????? ??????')
    // }
  }

  useEffect(() => {
    if (!(Object.values(userInput).includes('')) && userInput.pstType === "????????????") {
      setIsReadyToSubmit(true)
    } else if(!(Object.values({...userInput, pstDumy : complainDevice}).includes('')) && userInput.pstType === "????????????"){
      setIsReadyToSubmit(true)
    }else{
        setIsReadyToSubmit(false)
    }
  }, [userInput, complainDevice])

  return (
    <ThemeProvider theme={MuiTheme}>
      <SubLoginBackgroundView>
        <Wrap>
          <HeaderWrapper>
            <BinWrapper flex='1'>
              {/*<Link to='/serviceCenter'>*/}
                <ArrowBackIosIcon color='black' onClick={() => {
                  history.back()
                  setComplainStatus("")
                  setIsComplain("")
                  setComplainDevice("")
                }} />
              {/*</Link>*/}
            </BinWrapper>
            <MainText flex='3'>???????????? ??????</MainText>
            <BinWrapper flex='1'></BinWrapper>
          </HeaderWrapper>
        </Wrap>
        <BinWrapper>
          
          <FormControl fullWidth>
            <InputLabel id="pstType">?????? ??????</InputLabel>
            <Select
              name="pstType"
              labelId="pstType"
              id="pstType"
              value={complainStatus}
              label="pstType"
              onChange={handleChange}
              sx={{marginBottom: "24px"}}
              required
            >
              <MenuItem value={"????????????"}>?????? ??????</MenuItem>
              <MenuItem value={"????????????"}>?????? ??????</MenuItem>
            </Select>
          </FormControl>
          { userInput.pstType === "????????????" ? (
              <>
                <Box sx={{ display : 'flex', justifyContent: 'center', alignItems : 'center' }}>
                  <Button
                      color="primary"
                      sx={{ backgroundColor : "gainsboro", color : '#000' }}
                      variant="contained"
                      component="label"
                      onClick={() => {
                        setIsComplain(true)
                        console.log(isComplain)
                        navigate('/qr')
                      }}
                  >
                    <QrCode2Icon />
                    <span>???????????? ??????</span>
                  </Button>
                </Box>
                <Box sx={{ display : 'flex', justifyContent: 'center', alignItems : 'center' }}>
                  { complainDevice ? (
                        <h4>{ complainDevice }??? ????????????</h4>
                    ) : (<></>) }
                </Box>
              </>
          ) : (<></>) }
          <TextField
            name='pstTitle'
            id='pstTitle'
            label='??????'
            variant='standard'
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
            color='black'
            onChange={handleChange}
            required
          />

          <TextField
            name='pstCtnt'
            id='pstCtnt'
            label='??????'
            variant='standard'
            multiline
            fullWidth
            sx={{
              marginBottom: '32px',
            }}
            color='black'
            onChange={handleChange}
            required
          />

        </BinWrapper>


        <IconButton
          color='black'
          aria-label='upload picture'
          component='label'
          sx={{
            width: '150px',
            height: '150px',
            border: '1px solid',
            borderRadius : '30px',
            borderColor: 'rgba(0, 0, 0, 0.25)',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'gainsboro',
          }}
        >
          <img style={{ width : '130px', height: '130px', objectFit : 'cover' }} src={image.preview_URL}/>
          <input
              hidden
              accept='image/*'
              type='file'
              onChange={saveImage}
              onClick={(e) => e.target.value = null}
              ref={refParam => inputRef = refParam}
              // style={{display: "none"}}
          />
          {/*<PhotoCamera/>*/}

        </IconButton>
          { progress !== 0 ? (
              <Box sx={{ display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column', width : '100%' }}>
                  <Avatar
                      alt="Remy Sharp"
                      src="https://firebasestorage.googleapis.com/v0/b/ssokdam-e2b32.appspot.com/o/images%2Ftest%2F1.jpg?alt=media&token=72bc4824-1733-4184-a385-90a8a2652c3a"
                      sx={{ width: 100, height: 100 }}
                  />
                  <Box sx={{ textAlign : 'center', width : '100%', fontWeight : 'bold'}}>
                      { progress.toFixed(2) + `% ??????`  }
                  </Box>
              </Box>
          ) : (<></>) }
        {isReadyToSubmit ? (
          <MainButton width='100%' onClick={() => submitComplaint(userInput)}>
            <ButtonText>????????????</ButtonText>
          </MainButton>
        ) : (
          <NotReadyToSubmitButton>
            <ButtonText>????????????</ButtonText>
          </NotReadyToSubmitButton>
        )}

      </SubLoginBackgroundView>
    </ThemeProvider>
  );
}

export default Complaint