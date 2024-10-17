/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Stack } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import './productImage.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ImagesProps {
  images?: string[];
  image?: string;
}

const ProductImage: React.FC<ImagesProps> = ({ images = [], image }) => {
  const [mainImage, setMainImage] = useState<string>(image || '');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update the mainImage when the image prop changes (for new product selection)
  useEffect(() => {
    if (image) {
      setMainImage(image);
      setScale(1); // Reset the scale to 1 when the image changes
      setPosition({ x: 0, y: 0 }); // Reset the position when the image changes
    }
  }, [image]);

  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Limit zoom-in to 2x
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Limit zoom-out to original size
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setPrevPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imgRef.current && containerRef.current) {
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      const img = imgRef.current;
      const container = containerRef.current;

      // Get image and container boundaries
      const imgRect = img.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate new position
      let newX = position.x + deltaX;
      let newY = position.y + deltaY;

      // Constrain the image within container bounds
      const maxOffsetX = (imgRect.width * scale - containerRect.width) / 2;
      const maxOffsetY = (imgRect.height * scale - containerRect.height) / 2;

      newX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX));
      newY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY));

      setPosition({ x: newX, y: newY });
      setPrevPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box flex={2} sx={{ position: 'relative', overflow: 'hidden' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {/* Display product thumbnails */}
        <Stack direction="column" spacing={2} sx={{ cursor: 'pointer' }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="product thumbnail"
              width="150px"
              style={{ maxWidth: '100%', border: img === mainImage ? '2px solid teal' : 'none' }}
              onClick={() => handleThumbnailClick(img)} // Set clicked image as main image
            />
          ))}
        </Stack>

        {/* Display main product image with zoom and drag effect */}
        <Box
          ref={containerRef}
          sx={{
            position: 'relative',
            paddingLeft: { md: '3rem', xs: '0' },
            marginBottom: { xs: '1rem', md: '0' },
            overflow: 'hidden', // Ensure the image is constrained to the box
            width: '80%', // Set a fixed width for the container
            height: 'auto',
          }}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves container
        >
          {/* Zoom icons - Positioned absolutely */}
          <Box
            sx={{
              position: 'absolute',
              top: '8px', // Slight padding from the top
              left: '8px', // Slight padding from the left
              zIndex: 1000, // Ensure icons are above the image
              display: 'flex',
              flexDirection: 'column',
              gap: '8px', // Space between buttons
            }}
          >
            <IconButton onClick={handleZoomIn} size="small" sx={{ backgroundColor: 'white' }}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleZoomOut} size="small" sx={{ backgroundColor: 'white' }}>
              <RemoveIcon />
            </IconButton>
          </Box>

          {/* Main Image */}
          <img
            ref={imgRef}
            src={mainImage}
            width="90%"
            height="auto"
            alt="product image"
            style={{
              maxWidth: '100%',
              height: 'auto',
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              cursor: isDragging ? 'grabbing' : 'grab', // Change cursor during dragging
              transition: !isDragging ? 'transform 0.2s ease-in-out' : 'none', // Smooth transition when zooming
            }}
            draggable={false}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductImage;
