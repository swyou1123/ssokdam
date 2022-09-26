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
import {fetchNoticeUpdate} from "../../../api/admin";
import {storage} from "../../../firebase";

export const AdminNoticeUpdate = () => {
    const [mode,setMode] = useRecoilState(Mode)
    const navigate = useNavigate()
    const [notice,setNotice] = useRecoilState(NoticeDetail)
    const [image, setImage] = useState({
        image_file: ``, // 나중에 image로직 알게되면 preview_URL default값으로 notice.file URL 넣기
        preview_URL: `${notice.pstImg}`,
    });
    const [imageUrl, setImageUrl] = useState(`${notice.pstImg}`);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(100);
    //
    const [article, setArticle] = useState({
        id : `${notice.id}`,
        pstTitle : `${notice.pstTitle}`,
        pstCtnt : `${notice.pstCtnt}`
    })
    console.log(image.image_file)
    // const [article, setArticle] = useState({
    //     title : "",
    //     content : "",
    // });
    // useEffect(() => setArticle({...article, file : image.image_file}),
    //     [image])
    // console.log(article)

    const onChangeArticle = (e) => {
        console.log(e.target.name, e.target.value)
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
        if(!article.pstTitle){
            alert("제목을 입력해주세요.")
        }else if(image.image_file && article.pstCtnt){
            alert("텍스트와 이미지는 동시에 작성할 수 없습니다.")
        }else if(!image.image_file && !article.pstCtnt){
            fetchNoticeUpdate({...article, pstImg : `${notice.pstImg}`})
            alert("서버에 등록이 완료되었습니다!");
            window.location.replace("/admin")
        } else if (image.image_file || !article.pstCtnt) {
            // const formData = new FormData()
            // formData.append('file', image.image_file);
            // await axios.post('/api/image/upload', formData);
            // console.log(formData)
            // setArticle({...notice, file : image.image_file})
            // const createResponse = await CreateAdminNotice(notice);
            // await axios.post('http://localhost:8888/notices', {...notice, formData})
            // fetchNoticeUpdate({...notice, file : formData})
            // fetchNoticeUpdate도 써보기
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
                    setError("파일 업로드에 실패했습니다." + error);
                    setProgress(100); //진행중인 바를 삭제
                },
                () => {
                    upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setImageUrl(downloadURL);
                        console.log(downloadURL)
                        fetchNoticeUpdate({...article, pstImg : downloadURL})
                        alert("서버에 등록이 완료되었습니다!");
                        window.location.replace("/admin")
                    });
                }
            );
        }else if(!image.image_file && article.pstCtnt){
            fetchNoticeUpdate({...article, pstImg : ``})
            alert("서버에 등록이 완료되었습니다!");
            window.location.replace("/admin")
        }
        else{
            alert("사진이나 글을 등록하세요!")
        }
    }



    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <h2>공지사항 수정</h2>
                <FormControl fullWidth>
                    {/*<Box>*/}
                    {/*    <FormLabel id="demo-controlled-radio-buttons-group">공지사항 종류</FormLabel>*/}
                    {/*    <RadioGroup*/}
                    {/*        aria-labelledby="demo-controlled-radio-buttons-group"*/}
                    {/*        name="controlled-radio-buttons-group"*/}
                    {/*        value={value}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    >*/}
                    {/*        <FormControlLabel value="imageNotice" control={<Radio />} label="이미지 공지사항" />*/}
                    {/*        <FormControlLabel value="textNotice" control={<Radio />} label="텍스트 공지사항" />*/}
                    {/*    </RadioGroup>*/}
                    {/*</Box>*/}
                    <h3>제목</h3>
                    <TextField
                        fullWidth
                        placeholder="제목을 입력해주세요."
                        name="pstTitle"
                        autoFocus
                        defaultValue={notice.pstTitle}
                        onChange={onChangeArticle}
                    ></TextField>
                    <h3>내용</h3>
                    { notice.pstImg ? (
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
                                <img src={image.preview_URL}/>
                            </div>

                            <div className="upload-button">
                                <Button type="primary" variant="contained" onClick={() => inputRef.click()}>
                                    이미지 업로드
                                </Button>
                                <Button color="error" variant="contained" onClick={deleteImage}>
                                    삭제
                                </Button>
                                {/*<Button color="success" variant="contained" onClick={createNotice}>*/}
                                {/*    Upload*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                    )  : ( <TextField
                        fullWidth
                        placeholder="내용을 입력해주세요."
                        multiline
                        rows={12}
                        name="pstCtnt"
                        autoFocus
                        defaultValue={notice.pstCtnt}
                        onChange={onChangeArticle}
                    ></TextField> ) }
                </FormControl>

                <Box sx={{ display : 'flex', justifyContent : 'flex-end', marginTop : '10px' }}>
                    <Button variant="contained" startIcon={<BorderColorIcon />} onClick={updateNotice} >수정 </Button>
                </Box>
            </Container>
        </React.Fragment>
    )
}