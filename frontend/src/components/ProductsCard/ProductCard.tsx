/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
        Box,
        Card, 
        CardContent, 
        CardMedia, 
        Typography,
        Button,
        IconButton,
        Checkbox
     } from "@mui/material";
import {
    Favorite,
    FavoriteBorder,
    ShoppingCart,
} from "@mui/icons-material"
import discountImg from '../../assets/discountImg1.jpg'
import { Link } from "react-router-dom";
import './productCard.css'

// interface ProductProps {
//     title: string;
//     image: any;
//     review_count: number;
//     price: number;
// }

const ProductCard:React.FC = () => {
    return(
        // <Box padding={2}>
            <Card sx={{ maxWidth: 340 }}>
                <Box position='relative'>
                    <CardMedia 
                        sx={{ height: 440, position: 'relative' }}
                        component="img"
                        width="80px"
                        image={discountImg}
                        alt="Paella dish"
                        className="img-fluid card-img"
                    />
                    <IconButton aria-label="add to favorites" sx={{position:'absolute', top: 5, right: 5}}>
                        <Checkbox 
                            icon={<FavoriteBorder sx={{color:'#b0b0b0'}} />} 
                            color="error" 
                            size="large" 
                            checkedIcon={<Favorite />}
                        />
                    </IconButton>
                </Box>
                <CardContent sx={{padding: '1rem', margin: '0.2rem 0'}}>
                    <Typography>
                        <Link to='' style={{listStyle: 'none', textDecoration: 'none'}}>Title</Link>
                    </Typography>
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant="body2" color="text.secondary">
                            Ratings: 4.5/5
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            20(Reviews)
                        </Typography>
                    </Box>
                    <Typography variant="h5" component="h2" sx={{margin: '8px 0'}}>
                        150.00CFA
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{backgroundColor: '#550c18'}} 
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCart />}
                    >Add to Cart</Button>
                </CardContent>
                
            </Card>
        // </Box>
    )
}

export default ProductCard