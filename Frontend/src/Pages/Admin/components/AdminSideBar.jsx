import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DoorbellIcon from '@mui/icons-material/Doorbell';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useState} from "react";
import {useEffect} from "react";
import { AdminBrokenDeviceManagement } from "../AdminComplain/AdminBrokenDeviceManagement";
import { AdminCheckDevice } from "../AdminCheckDevice";
import { AdminComplaintManagement } from "../AdminComplain/AdminComplaintManagement";
import { AdminExchange } from "../AdminExchange";
import { AdminNotice } from "../AdminNotice/AdminNotice";
import { AdminUserManagement } from "../AdminUserManagement";
import { AdminMain } from "../AdminMain";
import {useNavigate} from "react-router-dom";
import {AdminNoticeCreate} from "../AdminNotice/AdminNoticeCreate";
import {Mode} from "../../../atoms";
import {useRecoilState} from "recoil";
import {Status} from "../../../atoms";


const drawerWidth = 240;

function AdminSideBar(props) {
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const itemIconList = [<AdminPanelSettingsIcon/> ,<DoorbellIcon/>,<SettingsRemoteIcon/>,<RecordVoiceOverIcon/>,<BrokenImageIcon/>,<ManageAccountsIcon/>,<CurrencyExchangeIcon/>]
    const [mode,setMode] = useRecoilState(Mode)
    const [status, setStatus] = useRecoilState(Status)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let comp = ''

    const onModeHandling = (text) => {
        console.log(mode)
        setMode(text)
    }

    if(mode === "????????? ??????"){
        comp = <AdminMain/>
    }else if(mode === "???????????? ??????"){
        comp = <AdminNotice/>
    }else if(mode === "?????? ?????? ??????"){
        comp = <AdminCheckDevice/>
    }else if(mode === "????????? ?????? ??????"){
        comp = <AdminComplaintManagement/>
    }else if(mode === "????????? ?????? ??????"){
        comp = <AdminBrokenDeviceManagement/>
    }else if(mode === "?????? ??????"){
        comp = <AdminUserManagement/>
    }else if(mode === "????????? ??????"){
        comp = <AdminExchange/>
    }else if(mode === '???????????? ??????'){
        comp = <AdminNoticeCreate/>
    }
    else{
        comp = <AdminMain/>
    }


    const drawer = (
        <div>
            <Box sx={{ display : 'flex', justifyContent : "center", alignItems : "center", height : '64px'}} >
                <Typography component="h2"
                            variant="h6"
                            style={{ cursor: 'pointer',
                                fontFamily : 'Gugi',
                                fontSize : '1.5rem'
                }}
                            onClick={(e) => {
                    onModeHandling("????????? ??????")
                }}>
                 ?????? <span style={{ fontFamily : 'SCoreDream' }}>?????????</span>
                </Typography>
            </Box>
            <Divider />
            <List>
                {['????????? ??????', '???????????? ??????', '?????? ?????? ??????', '????????? ?????? ??????', '????????? ?????? ??????', '?????? ??????','????????? ??????'].map((text, index) => (
                    <ListItem key={text}  disablePadding>
                        <ListItemButton onClick={(e) => {
                            onModeHandling(text)
                            setStatus("GENERAL")
                        }}>
                            <ListItemIcon>
                                {itemIconList[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>


            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box style={{ height : '100vh', width : '100%'}}>
                {comp}
            </Box>
        </Box>
    );
}


export default AdminSideBar;
