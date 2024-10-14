/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack, Rating, IconButton } from "@mui/material";
import ProductCard from "./ProductsCard/ProductCard";
import Typo from "./Typo";
import { useState, useEffect } from "react";
import discountImg from '../assets/discountImg1.jpg';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import './AllProducts.css';

interface ProductProps {
  id: number;
  name: string;
  price: number | string;
  slug?: string;
  image: any;
  review_count: string | null;
  average_rating: string | null;
}

function AllProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);  // Current page for product pagination
  const productsPerPage = 6;  // Number of products per row

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/featured/`);
      setFeaturedProducts(response.data.results);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const totalPages = Math.ceil(featuredProducts.length / productsPerPage);
  const currentProducts = featuredProducts.slice(
    currentPage * productsPerPage, 
    (currentPage + 1) * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box sx={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>
      <Typo heading="Featured Products" />
      <Container fluid>
        {/* Pagination controls with updated IconButton styles */}
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ marginTop: '2rem' }}>
          <IconButton
            sx={{
              backgroundColor: currentPage === 0 ? '#f0f0f0' : '#080808',
              '&:hover': {
                backgroundColor: '#080808', // Prevent hover color change
              },
              transition: 'background-color 0.3s ease-in-out',
              color: currentPage === 0 ? '#888' : '#e8e9eb' // Grey color for disabled state
            }}
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            <KeyboardArrowLeft sx={{ fontSize: '2rem' }} />
          </IconButton>

          <IconButton
            sx={{
              backgroundColor: currentPage >= totalPages - 1 ? '#f0f0f0' : '#080808',
              '&:hover': {
                backgroundColor: '#080808', // Prevent hover color change
              },
              transition: 'background-color 0.3s ease-in-out',
              color: currentPage >= totalPages - 1 ? '#888' : '#e8e9eb', // Grey color for disabled state
              fontWeight:'bold'
            }}
            disabled={currentPage >= totalPages - 1}
            onClick={handleNextPage}
          >
            <KeyboardArrowRight sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Stack>
        {/* Product cards grid with spacing */}
        <div>
        <Row className="gx-3 gy-4"> {/* Horizontal gap (gx) and vertical gap (gy) */}
          {currentProducts.map((product) => (
            <Col
              key={product.id}
              xs={12} sm={6} md={4} lg={2} // Control card width for different screen sizes
              style={{ padding: '0.75rem' }} // Control padding inside each column
            >
              <ProductCard
                name={product.name}
                price={`${product.price} CFA`}
                image={product.image || discountImg}
                review_count={product.review_count ? `${product.review_count} reviews` : 'No reviews yet'}
                average_rating={
                  <Rating
                    name={`rating-${product.id}`}
                    value={product.average_rating ? Number(product.average_rating) : 0}
                    readOnly
                    precision={0.5}
                  />
                }
              />
            </Col>
          ))}
        </Row>
        </div> 
      </Container>
    </Box>
  );
}

export default AllProducts;
