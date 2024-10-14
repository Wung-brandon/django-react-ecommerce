/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Box,
    Card, 
    CardContent, 
    CardMedia, 
    Typography,
    IconButton,
    Checkbox
  } from "@mui/material";
  import { Favorite, FavoriteBorder } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import './productCard.css';
  import ButtonComponent from "../Button.component";
  
  interface ProductProps {
    name: string;
    price: number | string;
    image: any;
    review_count: string;
    average_rating: string | any;
  }
  
  const ProductCard: React.FC<ProductProps> = ({ name, price, image, review_count, average_rating }) => {
    function handleAlert() {
      alert("Product added to cart successfully");
    }
  
    return (
      <Card sx={{ width: 280, 
                  height: 500, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                }}>
        <Box position="relative">
          <CardMedia 
            sx={{ height: 280 }}  // Fixed height for the image to ensure consistency
            component="img"
            image={image}
            alt={name}
            className="img-fluid card-img"
          />
          <IconButton aria-label="add to favorites" sx={{ position: 'absolute', top: 5, right: 5 }}>
            <Checkbox 
              icon={<FavoriteBorder sx={{ color: '#b0b0b0' }} />} 
              color="error" 
              size="large" 
              checkedIcon={<Favorite />} 
            />
          </IconButton>
        </Box>
        <CardContent sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            textAlign: 'center',
                
                         }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1rem', 
                fontWeight: 'bold', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}
            >
              <Link to='' style={{ textDecoration: 'none' }}>{name}</Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
              <Typography variant="body2" color="text.secondary">
                {average_rating || "No ratings"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review_count || "No reviews"}
              </Typography>
            </Box>
          </Box>
          <Typography 
                variant="h5" 
                component="h2" 
                sx={{ margin:'10px',
                      fontWeight: 'bold', 
                      textAlign:'center' 
                    }}
            >
            {price}
          </Typography>
          <ButtonComponent text="Add to Cart" onClick={handleAlert} />
        </CardContent>
      </Card>
    );
  };
  
  export default ProductCard;
  