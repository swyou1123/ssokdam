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
import {NoticeDetail} from "../../../atoms";
import CreateAdminNotice from "../../../api/admin";
import Typography from "@mui/material/Typography";
import {AdminNoticeUpdate} from "./AdminNoticeUpdate";
import { Divider } from '@mui/material';
import {fetchNoticeDelete} from "../../../api/admin";
import {Grid} from "@mui/material";

export const AdminNoticeDetail = () => {
    const [mode,setMode] = useRecoilState(Mode)
    const [status, setStatus] = useState("DETAIL")

    const navigate = useNavigate()
    const [notice,setNotice] = useRecoilState(NoticeDetail)
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
    });
    const [article, setArticle] = useState({
        title : "",
        content : "",
    });
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
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
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
        // createObjectURL()을 통해 생성한 기존 URL을 폐기
        URL.revokeObjectURL(image.preview_URL);
        setImage({
            image_file: "",
            preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
        });
    }

    useEffect(()=> {
        // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
        return () => {
            URL.revokeObjectURL(image.preview_URL)
        }
    }, [])

    const updateNotice = async () => {
        if(!article.title){
            alert("제목을 입력해주세요.")
        }else if (image.image_file || article.content) {
            const formData = new FormData()
            console.log(image.image_file)
            formData.append('file', image.image_file);
            // await axios.post('/api/image/upload', formData);
            console.log(formData)
            // setArticle({...article, file : image.image_file})
            // console.log(article)
            // const createResponse = await CreateAdminNotice(article);
            await axios.post('http://localhost:8888/notices', {...article, formData})
            // console.log(createResponse)
            alert("서버에 등록이 완료되었습니다!");
            setImage({
                image_file: "",
                preview_URL: "https://cdn-icons-png.flaticon.com/512/7715/7715867.png",
            });
            setMode("공지사항 관리")
        }else{
            alert("사진이나 글을 등록하세요!")
        }
    }
    const deleteNotice = () => {
        fetchNoticeDelete(notice.id)
            .then((res) => window.location.replace("/admin"))
    }



    return (
        <React.Fragment>
            { status === "DETAIL" ? (
                <Container maxWidth="xl">
                    <h2>공지사항 상세</h2>
                    <FormControl fullWidth>
                        <h3>제목</h3>
                        <Typography sx={{ marginLeft : '10px', marginBottom : '10px' }} component="h2" variant="h3" >
                            { notice.pstTitle }
                        </Typography>
                        <Divider/>
                        <h3>내용</h3>
                        <Box style={{ padding: "20px 20px" }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    { notice.pstImg ?  (
                                        <div className="uploader-wrapper">
                                            <input type="file" accept="image/*"
                                                   onChange={saveImage}
                                                // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
                                                // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
                                                   onClick={(e) => e.target.value = null}
                                                   ref={refParam => inputRef = refParam}
                                                   style={{display: "none"}}
                                            />
                                            <div className="img-wrapper">
                                                <img src={notice.pstImg}/>
                                            </div>

                                        </div>
                                    )  : ( <Typography>
                                        { notice.pstCtnt }
                                    </Typography> ) }
                                </Grid>
                            </Grid>

                        </Box>
                        <Divider/>
                    </FormControl>

                    <Box sx={{ display : 'flex', justifyContent : 'flex-end', marginTop : '10px' }}>
                        <Button sx={{ marginRight : '5px' }} variant="contained" startIcon={<BorderColorIcon />} onClick={() => {
                            setStatus("EDIT")
                        }}>수정하기</Button>
                        <Button color="error" variant="contained" onClick={deleteNotice}>
                            삭제
                        </Button>
                    </Box>
                </Container>
            ) : (<AdminNoticeUpdate/>) }

        </React.Fragment>
    )
}