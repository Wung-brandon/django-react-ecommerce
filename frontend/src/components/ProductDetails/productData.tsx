import { Box, Typography, Stack, Rating, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProductProps } from '../Types/productTypes';
import ButtonComponent from '../Button.component';
import { ShoppingCart, ExpandMore, Store } from "@mui/icons-material";

interface RatingBreakdown {
  star: number;
  percentage: number;
}

const ProductData: React.FC<ProductProps> = ({
  price,
  name,
  average_rating,
  available_sizes,
  brand,
  review_count,
  rating_percentages,
  stock,
}) => {
  const [ratingOpen, setRatingOpen] = useState(false);
  const [quantityAnchorEl, setQuantityAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
  const [progressValues, setProgressValues] = useState<number[]>([0, 0, 0, 0, 0]); // Store initial progress

  const ratingBreakdown: RatingBreakdown[] = [
    { star: 5, percentage: 68 },
    { star: 4, percentage: 14 },
    { star: 3, percentage: 7 },
    { star: 2, percentage: 3 },
    { star: 1, percentage: 8 },
  ];

  function handleAlert() {
    alert("Product added to cart successfully");
  }

  const toggleRatingDropdown = () => {
    setRatingOpen(!ratingOpen);
  };

  const handleQuantityClick = (event: React.MouseEvent<HTMLElement>) => {
    setQuantityAnchorEl(event.currentTarget);
  };

  const handleQuantityClose = () => {
    setQuantityAnchorEl(null);
  };

  const handleQuantitySelect = (quantity: number) => {
    setSelectedQuantity(quantity);
    handleQuantityClose();
  };

  // Animate progress values when ratingOpen changes with staggered delays
  useEffect(() => {
    if (ratingOpen) {
      const delays = [0, 200, 400, 600, 800]; // Stagger delays for each progress bar
      
      ratingBreakdown.forEach((item, index) => {
        setTimeout(() => {
          setProgressValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = item.percentage;
            return newValues;
          });
        }, delays[index]);
      });
    } else {
      // Reset progress values to 0 when closed
      setProgressValues([0, 0, 0, 0, 0]);
    }
  }, [ratingOpen]);

  return (
    <Box flex={3} marginLeft={6}>
      {/* Product Name */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: '16px' }}>
        Product name {name}
      </Typography>

      {/* Brand */}
      <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '16px' }}>
        Brand: {brand}
      </Typography>

      {/* Price */}
      <Typography variant="h6" color="#550c18" sx={{ marginBottom: '24px', fontWeight:'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Price: {price} CFA
      </Typography>

      {/* Average Rating with Dropdown */}
      <Typography variant='h6' mb={1} sx={{ color: '#f57c00' }}>20 {review_count} global rating </Typography>

      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="flex-start"
        spacing={1}
        onClick={toggleRatingDropdown} 
        sx={{ 
          marginBottom: '16px', 
          marginTop: '10px', 
          cursor: 'pointer', 
          border:4, 
          borderColor:'#f57c00',
          width: {xs: '100%', md: '18%'},
          borderRadius: '15px',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography 
            variant="body1" 
            sx={{
              color:'#080808',
              margin: '0 3.5px',
              fontWeight: 'bold'
            }}
          >{average_rating}</Typography>
          <Rating name="average-rating" value={average_rating} precision={0.1} readOnly />
        </Box>
        
        <IconButton onClick={toggleRatingDropdown}>
          <ExpandMore />
        </IconButton>
      </Stack>

      {/* Toggleable Rating Breakdown */}
      <Box 
        sx={{
          maxHeight: ratingOpen ? '300px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.5s ease-in-out',
        }}
      >
        {ratingOpen && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Shadow effect
            }}
          >
            <Box display='flex' mb={2} alignItems='center'>
                <Rating name="average-rating" value={average_rating} precision={0.1} readOnly />
                <Typography fontWeight='bold' variant='h6' sx={{color:'#080808'}} marginLeft={1}>{average_rating} out of 5</Typography>
            </Box>
            {ratingBreakdown.map((item, index) => (
              <Stack key={item.star} 
                  direction="row" 
                  alignItems="center" 
                  spacing={2} 
                  sx={{ marginBottom: '8px' }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>{item.star} star</Typography>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    height: '14px', // Increased height for visibility
                    overflow: 'hidden',
                    position: 'relative',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${progressValues[index]}%`,
                      backgroundColor: '#f57c00',
                      transition: 'width 1s ease-in-out', // Smooth fill animation
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>{item.percentage}%</Typography>
              </Stack>
            ))}
            <Button variant="outlined" size="small" sx={{ marginBottom: '24px' }}>
              See customer reviews
            </Button>
          </Box>
        )}
      </Box>

      <Box display='flex' alignItems='center' mb={2}>
        <Typography variant='h5'>Availability:</Typography>
        <Typography variant='h5' marginLeft={1} sx={{ color: '#550c18', fontWeight:'bold' }}>In stock {stock}</Typography>
      </Box>

      {/* Quantity Dropdown */}
      <Box 
        onClick={handleQuantityClick} 
        sx={{ 
          border: 4,
          borderColor: '#080808', 
          height: '50px', 
          width: { xs: '100%', md: '18%' }, 
          borderRadius: '20px', 
          marginBottom: '1rem', 
          cursor: 'pointer'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '16px', marginLeft: '16px' }}>
          <Typography variant="h5">Quantity: {selectedQuantity}</Typography>
          <IconButton onClick={handleQuantityClick}>
            <ExpandMore />
          </IconButton>
        </Stack>
      </Box>
      <Menu
        anchorEl={quantityAnchorEl}
        open={Boolean(quantityAnchorEl)}
        onClose={handleQuantityClose}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
          <MenuItem key={quantity} onClick={() => handleQuantitySelect(quantity)}>
            {quantity}
          </MenuItem>
        ))}
      </Menu>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '16px',
          justifyContent: 'flex-start',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <ButtonComponent
          text="Add to Cart"
          onClick={handleAlert}
          color="#550c18"
          icon={<ShoppingCart />}
          sx={{
            backgroundColor: '#550c18',
            color: '#fff',
            '&:hover': { backgroundColor: '#781d29' },
            padding: '10px 20px',
            width: '100%',
          }}
        />

        <ButtonComponent
          text="Buy Now"
          onClick={handleAlert}
          color="#f57c00"
          icon={<Store />}
          sx={{
            backgroundColor: '#f57c00',
            color: '#fff',
            '&:hover': { backgroundColor: '#fb8c00' },
            padding: '10px 20px',
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductData;
