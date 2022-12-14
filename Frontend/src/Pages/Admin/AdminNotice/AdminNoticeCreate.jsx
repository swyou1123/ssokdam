import React from 'react'
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import {Box, FormControl} from '@mui/material';
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import axios from 'axios';
import "../uploader.scss";
import {useState, useEffect} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from "react-router-dom";
import {Mode} from "../../../atoms";
import {useRecoilState} from "recoil";
import CreateAdminNotice from "../../../api/admin";
import {SERVER_URL} from "../../../config";
import {storage} from "../../../firebase";


export const AdminNoticeCreate = () => {
    const [mode,setMode] = useRecoilState(Mode)
    const navigate = useNavigate()
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
    });
    const [article, setArticle] = useState({
        title : "",
        content : "",
    });
    // const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(100);
    console.log(imageUrl)
    // useEffect(() => setArticle({...article, file : image.image_file}),
    //     [image])
    // console.log(article)

    const onChangeArticle = (e) => {
        setArticle({
            ...article,
            [e.target.name] : e.target.value
        })
        console.log(article)
    }

    const [value, setValue] = useState('imageNotice');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

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
            preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
        });
    }

    useEffect(()=> {
        // ??????????????? ?????????????????? createObjectURL()??? ?????? ????????? ?????? URL??? ??????
        return () => {
            URL.revokeObjectURL(image.preview_URL)
        }
    }, [])

    const createNotice = async () => {
        if(!article.title){
            alert("????????? ??????????????????.")
        }else if(image.image_file && article.content){
            alert("???????????? ???????????? ????????? ????????? ??? ????????????.")
        }else if (image.image_file && !article.content) {
            const storageRef = storage.ref("images/test/")
            const imagesRef = storageRef.child(image.image_file.name)
            const upLoadTask = imagesRef.put(image.image_file);
            upLoadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("snapshot", snapshot);
                    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(percent + "% done");
                    setProgress(percent);
                },
                (error) => {
                    console.log("err", error);
                    setError("?????? ???????????? ??????????????????." + error);
                    setProgress(100); //???????????? ?????? ??????
                },
                () => {
                    upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setImageUrl(downloadURL);
                        CreateAdminNotice({...article, pstImg : downloadURL})
                        alert("????????? ????????? ?????????????????????!");
                        setMode("???????????? ??????")
                    });
                }
            );
        }else if(!image.image_file && article.content){
            CreateAdminNotice({...article, pstImg : ''})
            alert("????????? ????????? ?????????????????????!");
            setMode("???????????? ??????")
        }
        else{
            alert("???????????? ?????? ???????????????!")
        }
    }



    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <h2>???????????? ??????</h2>
                <FormControl fullWidth>
                    <Box>
                        <FormLabel id="demo-controlled-radio-buttons-group">???????????? ??????</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="imageNotice" control={<Radio />} onClick={() => {
                                setArticle({
                                    ...article,
                                    content: ''
                                })
                            }} label="????????? ????????????" />
                            <FormControlLabel
                                value="textNotice"
                                control={<Radio />}
                                label="????????? ????????????"
                                onClick={() => {
                                    setImage({
                                        image_file: "",
                                        preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
                                    })
                                }}
                            />
                        </RadioGroup>
                    </Box>
                    <h3>??????</h3>
                    <TextField
                        fullWidth
                        placeholder="????????? ??????????????????."
                        name="title"
                        autoFocus
                        onChange={onChangeArticle}
                    ></TextField>
                    <h3>??????</h3>
                    { value === "imageNotice" ? (
                        <div className="uploader-wrapper">
                            <input type="file" accept="image/*"
                                   onChange={saveImage}
                                // ????????? ??? ?????? file input??? value??? ????????? ?????? ????????? ????????? ????????? ??? ??????
                                // ?????? ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????? ?????? ????????? ????????? ??? ?????? ????????????!
                                   onClick={(e) => e.target.value = null}
                                   ref={refParam => inputRef = refParam}
                                   style={{display: "none"}}
                            />
                            <div className="img-wrapper">
                                <img src={image.preview_URL}/>
                            </div>

                            <div className="upload-button">
                                <Button type="primary" variant="contained" onClick={() => inputRef.click()}>
                                    ????????? ?????????
                                </Button>
                                <Button color="error" variant="contained" onClick={deleteImage}>
                                    ??????
                                </Button>
                                {/*<Button color="success" variant="contained" onClick={createNotice}>*/}
                                {/*    Upload*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                    )  : ( <TextField
                        fullWidth
                        placeholder="????????? ??????????????????."
                        multiline
                        rows={12}
                        name="content"
                        autoFocus
                        onChange={onChangeArticle}
                    ></TextField> ) }
                </FormControl>

                <Box sx={{ display : 'flex', justifyContent : 'flex-end', marginTop : '10px' }}>
                    <Button variant="contained" startIcon={<BorderColorIcon />} onClick={createNotice} >??????</Button>
                </Box>
            </Container>
        </React.Fragment>
    )
}