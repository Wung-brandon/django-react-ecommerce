import { Box, Typography } from '@mui/material'
import React from 'react'
import { ProductProps } from '../Types/productTypes'

const ProductData:React.FC<ProductProps> = ({price, name, average_rating, available_sizes, brand, review_count}) => {
  return (
    <Box flex={3} bgcolor='teal'>
        <Typography variant='h4'>product name</Typography>
    </Box>
  )
}

export default ProductData