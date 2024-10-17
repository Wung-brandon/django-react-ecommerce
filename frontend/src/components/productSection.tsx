import { Box, Stack, Rating, IconButton } from "@mui/material";
import ProductCard from "./ProductsCard/ProductCard";
import Typo from "./Typo";
import { useState, useEffect } from "react";
import discountImg from '../assets/discountImg1.jpg';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { ProductProps } from "./Types/productTypes";
import './AllProducts.css';

interface ProductSectionProps {
  heading: string; // Title for the section, e.g. "Featured Products"
  apiUrl: string;  // API endpoint to fetch products
}

const ProductSection = ({ heading, apiUrl }: ProductSectionProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data.results);
    } catch (error) {
      console.error(`Error fetching ${heading.toLowerCase()}:`, error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [apiUrl]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
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
    <Box sx={{ marginRight: '0.5rem', marginLeft: '0.5rem', marginBottom: '2rem' }}>
      <Typo heading={heading} />
      <Container fluid>
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ marginTop: '2rem' }}>
          <IconButton
            sx={{
              backgroundColor: currentPage === 0 ? '#f0f0f0' : '#080808',
              '&:hover': { backgroundColor: '#080808' },
              transition: 'background-color 0.3s ease-in-out',
              color: currentPage === 0 ? '#888' : '#e8e9eb',
            }}
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            <KeyboardArrowLeft sx={{ fontSize: '2rem' }} />
          </IconButton>

          <IconButton
            sx={{
              backgroundColor: currentPage >= totalPages - 1 ? '#f0f0f0' : '#080808',
              '&:hover': { backgroundColor: '#080808' },
              transition: 'background-color 0.3s ease-in-out',
              color: currentPage >= totalPages - 1 ? '#888' : '#e8e9eb',
              fontWeight: 'bold',
            }}
            disabled={currentPage >= totalPages - 1}
            onClick={handleNextPage}
          >
            <KeyboardArrowRight sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Stack>

        <div>
          <Row className="gx-3 gy-4">
            {currentProducts.map((product) => (
              <Col
                key={product.id}
                xs={12} sm={6} md={4} lg={2}
                className="d-flex justify-content-center"
                style={{ padding: '0.75rem'}}
              >
                <ProductCard
                  id={product.id}
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
                  slug={product.slug}  // Ensure you are passing slug here
                  
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </Box>
  );
};

export default ProductSection;
