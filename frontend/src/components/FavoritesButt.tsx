/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { IconButton, Checkbox, Tooltip } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'



const FavoritesButt:React.FC<{sx:any}> = ({sx}) => {
  return (
    <Tooltip title='Add to Favorites' sx={{backgroundColor:'#550c18'}}>
          <IconButton 
            aria-label="add to favorites" 
            sx={sx}
          >
            <Checkbox 
              icon={<FavoriteBorder sx={{ color: '#b0b0b0' }} />} 
              color="error" 
              size="large" 
              checkedIcon={<Favorite />} 
            />
          </IconButton>

    </Tooltip> 
  )
}

export default FavoritesButt