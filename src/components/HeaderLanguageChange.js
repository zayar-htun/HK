import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Translation from '../translate/translate.json'
import { themeContext } from '../ThemedDetail';

const HeaderChangeLanguage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Eng');
  const { translate, setTranslate } = useContext(themeContext);
  

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    if(selectedOption=="Eng"){
        setTranslate(Translation.Eng)
    }else if (selectedOption=="Myr"){
        setTranslate(Translation.Myr)
    }else{
        setTranslate(Translation.ZawGyi)
    }
  });

  const getAvatar = (option) => {
    if (option === 'Eng') {
      return <Avatar src="https://cdn.imgbin.com/2/12/12/imgbin-logo-primera-air-organization-business-english-language-british-flag-zSPA9W4mDSMqHmnRnzhgdxHLs.jpg" style={{ height: '28px', width: '28px' , marginRight:"6px" }} />;
    } else if (option === 'Myr') {
      return <Avatar src="https://vectorflags.s3.amazonaws.com/flags/mm-button-01.png" alt="France" style={{ height: '28px', width: '28px' , marginRight:"6px"}} />;
    }
    else {
      return <Avatar src="https://vectorflags.s3.amazonaws.com/flags/mm-button-01.png" alt="France" style={{ height: '28px', width: '28px' , marginRight:"6px"}} />;
    }
  };

  

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="split button">
        <Button
          onClick={handleButtonClick}
          style={{ backgroundColor: 'transparent' , boxShadow:0 }} // Remove background color

        >
          {getAvatar(selectedOption)}
          {selectedOption === 'Myr' ? 'မြန်မာ' : selectedOption === 'ZawGyi' ? 'ဇော်ဂျီ' : 'Eng'}
          {/* ▼ */}
        </Button>
      </ButtonGroup>
      <Menu
        id="split-button-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('Eng')}>
          {getAvatar('Eng')}
          Eng
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Myr')}>
          {getAvatar('Myr')}
          မြန်မာ
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('ZawGyi')}>
          {getAvatar('Myr')}
          ဇော်ဂျီ 
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderChangeLanguage;
