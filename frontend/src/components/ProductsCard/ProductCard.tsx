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
import { ProductProps } from "../Types/productTypes";

const ProductCard: React.FC<ProductProps> = ({ name, price, image, review_count, average_rating, slug }) => {
  function handleAlert() {
    alert("Product added to cart successfully");
  }

  return (
    <Card 
      sx={{ 
        width: { xs: '100%', sm: '100%' },  // Full width on small screens, 300px for larger screens
        height: { xs: 'auto', sm: 'auto' },  // Auto height on small and large screens for better adjustment
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        margin: '0 auto',  // Center the card on small screens
      }}
    >
      <Box position="relative">
        <Link to={`/products/${slug}`}>
          <CardMedia 
            sx={{ 
              height: { xs: 380, sm: 400 },  // Adjust the image height for small screens
            }}
            component="img"
            image={image}
            alt={name}
            className="img-fluid card-img"
          />
          </Link>
        <IconButton 
          aria-label="add to favorites" 
          sx={{ 
            position: 'absolute', 
            top: 5, 
            right: 5 
          }}
        >
          <Checkbox 
            icon={<FavoriteBorder sx={{ color: '#b0b0b0' }} />} 
            color="error" 
            size="large" 
            checkedIcon={<Favorite />} 
          />
        </IconButton>

      </Box>
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          textAlign: 'center',
          padding: { xs: '8px', sm: '16px' },  // Adjust padding for small screens
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },  // Smaller font size for small screens
              fontWeight: 'bold', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
            }}
          >
            <Link to={`/products/${slug}`} style={{textDecoration: 'none'}} className="link">
                {name}
            </Link>
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingTop: '5px',
            fontSize: { xs: '0.75rem', sm: '1rem' }  // Adjust font size for small screens
          }}>
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
          sx={{ 
            margin: { xs: '5px', sm: '10px' }, 
            fontWeight: 'bold', 
            textAlign:'center',
            fontSize: { xs: '1.25rem', sm: '1.5rem' }  // Adjust price font size for responsiveness
          }}
        >
          {price}
        </Typography>
        <ButtonComponent 
          text="Add to Cart" 
          onClick={handleAlert} 
          sx={{ 
            width: { xs: '100%', sm: 'auto' },  // Full width button on small screens
            padding: { xs: '8px', sm: '10px 20px' }  // Adjust padding for small screens
          }} 
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
