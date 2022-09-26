import React from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BuildIcon from '@mui/icons-material/Build';

import { SERVER_URL } from '../../config';
import axios from "axios";
import {fetchUsers, UpdateUser, DeleteUser } from "../../api/admin";

const columns = [
    { field: 'id', headerName: '아이디', flex : 1, headerAlign: 'center', align: "center"},
    { field: 'userName', headerName: '회원이름', flex : 1, headerAlign: 'center',align: "center"},
    { field: 'userAccount', headerName: '계좌번호',headerAlign: 'center', flex : 1, align: "center"},
    {
        field: 'userPoint',
        headerName: '포인트',
        type : 'number',
        flex : 1,
        align: "center",
        headerAlign: 'center',
    },
    {
        field: 'userEmail',
        headerName: '이메일',
        type : 'email',
        flex : 1,
        align: "center",
        headerAlign: 'center',
    },
];

const rows = [
    { id: 'kiki249', userPwd: '*****!', userBirthDay: '1993-11-18', userPoint: 120, userEmail : 'kiki249@naver.com' },
    { id: 'swyou', userPwd: '*****9', userBirthDay: '1997-11-18', userPoint: 100, userEmail : 'swyou97@naver.com'  },
    { id: 'kdmhello', userPwd: '*****4', userBirthDay: '1997-11-18', userPoint: 300, userEmail : 'kdmhello97@naver.com'},
    { id: 'kdwon', userPwd: '*****$', userBirthDay: '1997-11-18', userPoint: 240, userEmail : 'kdwon96@naver.com' },
    { id: 'yshan', userPwd: '*****w', userBirthDay: '1997-11-18', userPoint: 500, userEmail : 'yshan97@naver.com' },
    { id: 'jhwon', userPwd: '*****s', userBirthDay: '1998-11-18', userPoint: 1000, userEmail : 'jhwon98@naver.com' },
    { id: 'hello', userPwd: '*****j', userBirthDay: '1994-11-18', userPoint: 20, userEmail : 'kiki249@naver.com' },
    { id: 'ecowon', userPwd: '*****v', userBirthDay: '1995-11-18', userPoint: 40, userEmail : 'kiki249@naver.com' },
    { id: 'cigarnono', userPwd: '*****d', userBirthDay: '1996-11-18', userPoint: 60, userEmail :'kiki249@naver.com' },
];


export const AdminUserManagement = () => {
    const [usersInfo, setUsersInfo] = useState([])
    const [select, setSelection] = useState([]);
    console.log(select)

    useEffect(() => {
        const fetchMyUser = fetchUsers()
            .then((res) => console.log(res.json().then((res) => {
                console.log(res)
                for(let i=0; i < res.length; i++ ){
                    res[i].id = res[i].userId
                    delete res[i].userId
                }
                setUsersInfo(res)
            })))
    }, []);

    // const updateUsers = () => {
    //     UpdateUser(select)
    //         .then((res) => console.log(res))
    // }

    const deleteUsers = () => {
        DeleteUser(select)
            .then((res) => window.location.replace("/admin"))
    }


    return (
        <React.Fragment>
            <Box sx={{ marginLeft : '20px' }}>
                <h2>회원 관리</h2>
                <div style={{ height: 400, width: '99%' }}>
                    <DataGrid
                        rows={usersInfo}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onSelectionModelChange={(newSelection) => {
                            setSelection(newSelection)
                        }}
                    />
                </div>
            </Box>
            <Box sx={{ display : 'flex', justifyContent : 'flex-end', marginRight : '20px', marginTop : '10px' }}>
                {/*<Button variant="contained" startIcon={<BuildIcon />} sx={{ marginRight : '10px' }} onClick={() => {*/}
                {/*    updateUsers()*/}
                {/*}} >수정</Button>*/}
                <Button variant="contained" startIcon={<DeleteIcon />} color='error' onClick={() => {
                    deleteUsers()
                }} >삭제</Button>
            </Box>
        </React.Fragment>
    )
}