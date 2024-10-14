/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack } from "@mui/material";
import ProductCard from "./ProductsCard/ProductCard";
import Typo from "./Typo";
import { useState, useEffect } from "react";
import discountImg from '../assets/discountImg1.jpg';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import for animation
import { Rating } from '@mui/material'; // Import Rating component

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
      console.log('response data', response.data);
      setFeaturedProducts(response.data.results);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Calculate the total number of pages based on the number of products
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage);

  // Get products for the current page
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
    <Box sx={{ padding: "1rem", marginRight:'1.5rem', marginLeft:'0.5rem'}}>
      <Typo heading="Featured Products" />
      
      <Container fluid>
        <Row className="g-4">
          
            {currentProducts.map((product) => (
              
                <Col xs={12} sm={6} md={4} lg={2} style={{ marginBottom: '1.5rem' }}> {/* Spacing with margin */}
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
                    } // Use Material-UI Rating for visual representation
                  />
                </Col>
              
            ))}
         
        </Row>

        {/* Pagination controls */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ marginTop: '2rem' }}>
          <Button
            variant="contained"
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={currentPage >= totalPages - 1}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Stack>
      </Container>

      {/* CSS for fade transition */}
      <style>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </Box>
  );
}

export default AllProducts;
