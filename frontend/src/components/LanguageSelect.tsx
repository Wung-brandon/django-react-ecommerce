/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, FormControl, Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import BritainFlag from '../assets/svg icons/united-kingdom-flag-icon.svg'; 
import FranceFlag from '../assets/svg icons/france-flag-icon.svg'

interface LanguageProps{
    language: string;
    handleChange: any;
}

const LanguageSelect:React.FC<LanguageProps> = ({ language, handleChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth sx={{ backgroundColor: '#550c18', color: 'white' }}>
        <Select
          value={language || 'English'} // Set default to English
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#550c18',
                color: 'white',
              },
            },
          }}
          sx={{
            color: 'white', // Set color for the Select text
            '& .MuiSelect-icon': {
              color: 'white', // Set color for the dropdown icon
            },
            '&:before': {
              borderBottom: '1px solid white', // Underline color
            },
            '&:after': {
              borderBottom: '1px solid white', // Underline color when selected
            },
            '&.Mui-focused:before': {
              borderBottom: '1px solid white', // Underline color when focused
            },
            '&.Mui-selected': {
              color: 'white', // Text color when selected
            },
          }}
        >
          <MenuItem value='English' sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <img src={BritainFlag} alt="United Kingdom Flag" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="English" />
          </MenuItem>
          <MenuItem value='French' sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <img src={FranceFlag} alt="France Flag" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="French" />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelect;
