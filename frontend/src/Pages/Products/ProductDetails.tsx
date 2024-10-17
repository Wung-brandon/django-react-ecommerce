/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { ProductProps } from '../../components/Types/productTypes';
import ProductData from '../../components/ProductDetails/productData';
import ProductImage from '../../components/ProductDetails/productImage';
import ProductTabs from '../../components/ProductDetails/productTab';
import ProductSection from '../../components/productSection';

const ProductDetails:React.FC<ProductProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_PRODUCT_BASE_URL

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id === 'undefined') {
        setError("Product ID is missing or invalid");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/${id}/`);
        console.log('product details', response.data)
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  

  return (
    <Box padding='1.5rem'>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        {/* Pass image URLs instead of JSX elements */}
        <ProductImage 
          image={product.image}
          images={product.images ? product.images.map((img: any) => img.image) : []}
        />
    
        {/* Product data */}
        <ProductData />
      </Stack>
  
      {/* Display more product details as needed */}
      <Box padding='1rem'>
        <ProductTabs />
      </Box>

      {/* Render Related Products */}
      <ProductSection 
        heading="Related Products" 
        apiUrl={`${apiUrl}/${id}/related/`} 
      />

      {/* <h1>{product.name}</h1>
  
  
  <img src={product.image} alt={product.name} width="150px" />
  
  
  {product.images && product.images.map((img:any) => (
    <img key={img.id} src={img.image} alt={product.name} width="150px" />
  ))}
  
  <p>{product.description}</p>
  <p>Price: CFA{product.price}</p>
  <p>Brand: {product.brand}</p>
  <p>Average Rating: {product.average_rating}</p>
  
 
  <p>Available Sizes:</p>
  <ul>
    {product.available_sizes && product.available_sizes.map((size:any) => (
      <li key={size}>{size}</li>
    ))}
  </ul> */}
    </Box>
  );
};

export default ProductDetails;


