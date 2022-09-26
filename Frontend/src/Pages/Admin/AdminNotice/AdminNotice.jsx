import {useEffect, useState} from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import PropTypes from 'prop-types';
import {Box} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {AdminNoticeCreate} from "./AdminNoticeCreate";
import {Mode} from "../../../atoms";
import {useRecoilState} from "recoil";
import {AdminNoticeDetail} from "./AdminNoticeDetail";
import {fetchNotices} from "../../../api/admin";
import {NoticeDetail} from "../../../atoms";
import {fetchNoticeDelete} from "../../../api/admin";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize : 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export const AdminNotice = () => {
    // 글로벌 Mode
    const [mode, setMode] = useRecoilState(Mode)
    // 글 Detail
    const [status, setStatus] = useState("GENERAL")
    const [id, setId] = useState(null);
    const [noticeDetail, setNoticeDetail] = useRecoilState(NoticeDetail)
    // pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // 전체 공지사항
    const [notices, setNotices] = useState([])

    function createData(id, pstTitle, userId, pstDt, trash) {
        return { id, pstTitle, userId, pstDt, trash };
    }

    const rows = [
        // createData(1, "이제부터 포인트가 2배씩!",  "김도원", "2022-08-02", <DeleteIcon/>),
        // createData(2, "친구 초대 시 500 포인트", "김강현", "2022-08-02",  <DeleteIcon/>),
        // createData(3, "QR 찍지 않아도 됩니다!", "권덕민", "2022-08-02",  <DeleteIcon/>),
        // createData(4, "공통 프로젝트 C106", "유승우", "2022-08-02", <DeleteIcon/>),
        // createData(5, "1등했다고 합니다", "윤성한", "2022-08-02",  <DeleteIcon/>),
        // createData(6, "조금만 힙냅시다!", "정혜원", "2022-08-02",  <DeleteIcon/>),
        // 정보 받아오면 create(pstSeq, pstTitle, userId, pstDt, <DeleteIcon/> ) map 함수로 돌리기
        notices.map((notice) => {
            return createData(notice.id ,notice.pstTitle, notice.userId, notice.pstDt,<DeleteIcon/>)
        })
    ];


    useEffect(() => {
        const fetchMyNotices = fetchNotices()
            .then((res) => console.log(res.json().then((res) => {
                console.log(res)
                for(let i=0; i < res.length; i++ ){
                    res[i].id = res[i].pstSeq
                    delete res[i].pstSeq
                }
                res.reverse((a,b) => {
                    return a.id - b.id
                })
                setNotices(res)
            })))
    }, []);

    let content = null;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if(status === "DETAIL"){
        // notices돌면서 id와 같은것 정보 가져옴
        for(let i=0; i<notices.length; i++){
            if(notices[i].id === id){
                setNoticeDetail(notices[i])
            }
        }
    }
    const deleteNotice = (id) => {
        fetchNoticeDelete(id)
            .then((res) => console.log(res))
        window.location.replace("/admin")
    }



    return (
        <>
            { status === "GENERAL" ? (
                <>
                    <h2 style={{ marginLeft : '30px' }}>공지 사항</h2>
                    <Box sx={{ display : "flex", flexDirection : 'column', width : '100%' }}>
                        <TableContainer sx={{ width : '100%', margin : '20px' }} component={Paper}>
                            <Table sx={{ minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">번호</StyledTableCell>
                                        <StyledTableCell align="center">제목</StyledTableCell>
                                        <StyledTableCell align="center">작성자</StyledTableCell>
                                        <StyledTableCell align="center">작성일</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? rows[0].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : rows[0]
                                    ).map((notice,index) => (
                                        <StyledTableRow key={notice.id}>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ cursor : 'pointer' }}  onClick={() => {
                                                setId(notice.id)
                                                setStatus("DETAIL")
                                            }} align="center">{notice.pstTitle}</StyledTableCell>
                                            <StyledTableCell style={{ cursor : 'pointer' }} align="center">{notice.userId}</StyledTableCell>
                                            <StyledTableCell style={{ cursor : 'pointer' }} align="center">{notice.pstDt}</StyledTableCell>
                                            <StyledTableCell style={{ cursor : 'pointer' }} align="center" onClick={() => deleteNotice(notice.id)}>{notice.trash}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    <hr style={{ visibility : 'hidden' }}/>
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={rows[0].length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display : 'flex', justifyContent : 'flex-end', marginRight : '20px', marginTop : '10px' }}>
                            <Button variant="contained" startIcon={<BorderColorIcon />} onClick={() => setMode('공지사항 작성')} >글 작성</Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <AdminNoticeDetail/>
                    <Button variant="contained" sx={{ mx : 4 }} onClick={() => {
                    setStatus("GENERAL")
                }}>뒤로가기</Button>
                </>
                ) }

        </>
    )
}