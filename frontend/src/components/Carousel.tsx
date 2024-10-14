import Carousel from 'react-bootstrap/Carousel';
import { Box, Typography, Button, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import img1 from '../assets/womandress.jpg';
import luxuryWatchImg from '../assets/luxarywatch.jpg';
import arrivalImg from '../assets/2148312143 (1).jpg';
import discountImg from '../assets/front-view.jpg';  // Add discount dress image
import collection1 from '../assets/women-collection-dresses.jpg'
import collection2 from '../assets/pexels-shkrabaanthony-5264952.jpg'
import collection3 from '../assets/istockphoto-1441098845-612x612.jpg'
import collection4 from '../assets/watch-collection.jpg'

// Sample images for New Arrivals
const newArrivals = [
  { img: collection1, title: 'Women Collection' },
  { img: collection2, title: 'Men Collection' },
  { img: collection3, title: 'Children Collection' },
  { img: collection4, title: 'Watch Collection' },
];

function EcommerceCarousel() {
  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', position: 'relative' }}>
      <Carousel 
        controls={true} 
        indicators={true} 
        interval={5000}  // Set auto-slide to 5 seconds
        prevIcon={<span className="carousel-control-prev-icon custom-control" />}
        nextIcon={<span className="carousel-control-next-icon custom-control" />}
      >
        
        {/* Slide 1 */}
        <Carousel.Item>
          <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={{ objectFit: 'cover', height: '100vh', width: '100%' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '5%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight background overlay for text visibility
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px'
              }}
            >
              <Typography variant="h3" component="h3" gutterBottom>
                Discover Exclusive Fashion Trends
              </Typography>
              <Typography variant="body1">
                Stay ahead with our latest collection of premium clothing.
              </Typography>
            </Box>
          </Box>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <img
              className="d-block w-100"
              src={luxuryWatchImg}
              alt="Second slide"
              style={{ objectFit: 'cover', height: '100vh', width: '100%' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '5%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px'
              }}
            >
              <Typography variant="h3" component="h3" gutterBottom>
                Luxury Accessory Watches at Affordable Prices
              </Typography>
              <Typography variant="body1">
                Elevate your style with exclusive deals on our best-selling accessories.
              </Typography>
            </Box>
          </Box>
        </Carousel.Item>

        {/* Slide 3 with New Arrivals ImageList */}
        <Carousel.Item>
          <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <img
              className="d-block w-100"
              src={arrivalImg}
              alt="Third slide"
              style={{ objectFit: 'cover', height: '100vh', width: '100%' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '5%',
                transform: 'translateY(-50%)',
                width: '70%', // Adjust width for better spacing
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h3" component="h3" gutterBottom sx={{ marginBottom: '20px' }}>
                New Arrivals for Men, Women & Kids
              </Typography>
              <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={8}>

                {newArrivals.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                      className='img-fluid'
                    />
                    <ImageListItemBar
                      title={item.title}
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                    />
                  </ImageListItem>
                ))}

              </ImageList>

            </Box>
          </Box>
        </Carousel.Item>

        {/* Call to Action Slide */}
        <Carousel.Item>
          <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <img
              className="d-block w-100"
              src={discountImg}
              alt="Discount dress slide"
              style={{ objectFit: 'cover', height: '100vh', width: '100%' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '5%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px'
              }}
            >
              <Typography variant="h3" component="h3" gutterBottom>
                Limited Time Offer!
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Get an exclusive 30% discount on all dresses. Hurry, shop now!
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: '#f44336' }} size="large">
                Buy Now
              </Button>
            </Box>
          </Box>
        </Carousel.Item>

      </Carousel>

      {/* Custom styles for carousel controls */}
      <style>
        {`
          .custom-control {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 50%;
            padding: 20px;
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 30px;
            height: 30px;
          }
        `}
      </style>
    </Box>
  );
}

export default EcommerceCarousel;
