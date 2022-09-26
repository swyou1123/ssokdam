import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';


export const NavBar = () => {
  const navi = useNavigate()
  const [open, setOpen] = useState(false)

  const list = (anchor) => (
    <Box
      sx={{ width: 250, padding: "52px 0px 0px 8px"}}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {[['마이페이지', '/myPage'], ['포인트 전환', '/exChange'], ['서비스 안내', '/serviceInfo'], ['고객센터', '/serviceCenter']].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navi(text[1])}>
              <ListItemText primary={text[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
          <Button onClick={() => setOpen(true)} sx={{minWidth: "24px", padding: "0px", justifyContent: "flex-start", alignItems: "center", marginTop: "-2px"}}>
            <FormatAlignJustifyIcon color='black' />
          </Button>

          <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
            {list('right')}
          </Drawer>
    </>
  );
}